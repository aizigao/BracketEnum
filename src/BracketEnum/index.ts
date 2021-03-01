type Code = string;
type Value = string | number;
type Desc = string;
type Extra = any;

const isNil = (v: any) => v == null;

export type IEnumOption<IEmumValue, IEmumDesc> = {
  label?: IEmumDesc;
  value?: IEmumValue;
  key?: IEmumValue;
  extra?: any;
};

type IValueEnum = Record<
  string,
  {
    text: string;
    status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
    extra?: any;
  }
>;

/**
 * 枚举定义工具
 * @example
 * ```jsx
 * const STATUS = new DtEnum([
 * ['AUDIT_WAIT', [1, '审核中']],
 * ['AUDIT_PASS', [2, '审核通过']]
 * ])
 * ```
 */
class DtEnum<
  C extends [T, [V, D, Extra?]],
  T extends Code,
  V extends Value | number,
  D extends Desc
> {
  private byCodeMap: Record<
    string,
    {
      code: C[0];
      value: C[1][0];
      desc: C[1][1];
      extra?: C[1][2];
    }
  > = {};

  private byValueMap: Record<
    string,
    {
      code: C[0];
      value: C[1][0];
      desc: C[1][1];
      extra?: C[1][2];
    }
  > = {};

  private configList: C[] = [];

  static of<
    FC extends [FT, [FV, FD, Extra?]],
    FT extends Code,
    FV extends Value | number,
    FD extends Desc
  >(config: FC[]) {
    return new DtEnum(config);
  }

  values: C[1][0][];

  constructor(config: C[]) {
    this.configList = config;
    this.values = [];
    config.forEach(item => {
      const [code, [value, desc, extra]] = item;
      this.byCodeMap[code] = { code, value, desc, extra };
      this.byValueMap[String(value)] = { code, value, desc, extra };
      this.values.push(value);
    });
  }

  /**
   * 由code获取value
   * @param code
   */
  getValueByCode(code: C[0]): C[1][0] {
    return this.byCodeMap[code]?.value;
  }

  /**
   * 由code获取desc
   * @param code
   */
  getDescByCode(code: C[0]): C[1][1] {
    return this.byCodeMap[code]?.desc;
  }

  /**
   * 由code获取extra
   * @param code
   */
  getExtraByCode(code: C[0]): C[1][2] {
    return this.byCodeMap[code]?.extra;
  }

  /**
   * 由value获取desc
   * @param value
   */
  getDescByValue(value: C[1][0]): C[1][1] | undefined {
    if (String(value) in this.byValueMap) {
      return this.byValueMap[String(value)]?.desc;
    }
  }

  /**
   * 由value获取extra
   * @param value
   */
  getExtraByValue(value: C[1][0]): C[1][2] | undefined {
    if (String(value) in this.byValueMap) {
      return this.byValueMap[String(value)]?.extra;
    }
  }

  /**
   * 获取所有values
   * @example
   * ```jsx
   * STATUS.getAllValues() // => [1,2]
   * ```
   */
  getAllValues() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.configList.map(([code, [value]]) => value);
  }

  /**
   * 转为form要使用的option
   * @example
   * STATUS.toFormOptions()
   */
  toFormOptions(hasAll: boolean = false): any[] {
    const allOption = {
      key: null,
      value: null,
      label: '全部',
      extra: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this.configList.map(([code, [value, desc, extra]]) => {
      return {
        key: value,
        value,
        label: desc,
        extra,
      };
    });

    if (hasAll) {
      return [allOption, ...result];
    }
    return result;
  }

  /**
   * 转为antd pro table 需要的ValueEnum
   * @example
   * STATUS.toFormValueEnum()
   *
   * // return example
   * {
   *    1: {text: '审核中'}
   * }
   */
  toFormValueEnum(): IValueEnum {
    const result: IValueEnum = {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.configList.forEach(([code, [value, desc, extra]]) => {
      if (!isNil(value)) {
        result[String(value)] = {
          text: desc,
          status: extra && extra.status,
          extra,
        };
      }
    });
    return result;
  }

  /**
   * value与code对应值匹配
   * @example
   * STATUS.checkValueByCode('AUDIT_WAIT',1)
   */
  checkValueByCode(code: C[0], value: C[1][0]): boolean {
    const iValue = this.getValueByCode(code);
    return iValue === value;
  }
}

export { DtEnum, DtEnum as default };
