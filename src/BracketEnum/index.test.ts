// eslint-disable-next-line import/no-named-as-default
import BracketEnum from '.';

describe('BracketEnum test', (): void => {
  const STATUS = BracketEnum.of([
    ['AUDIT_WAIT', [1, '审核中', 'extra1']],
    ['AUDIT_PASS', [2, '审核通过', 'extra2']],
  ]);

  it('fn getValueByCode', (): void => {
    expect(STATUS.getValueByCode('AUDIT_PASS')).toBe(2);
  });

  it('fn getDescByCode', (): void => {
    expect(STATUS.getDescByCode('AUDIT_WAIT')).toBe('审核中');
  });

  it('fn getDescByValue', (): void => {
    expect(STATUS.getDescByValue(2)).toBe('审核通过');
  });

  it('fn getDescByValue undefined ', (): void => {
    expect(STATUS.getDescByValue(3 as any)).toBe(undefined);
  });

  it('fn getExtraByValue undefined ', (): void => {
    expect(STATUS.getExtraByValue(3 as any)).toBe(undefined);
    expect(STATUS.getExtraByValue(2 as any)).toBe('extra2');
  });

  it('fn getAllValues', (): void => {
    expect(STATUS.getAllValues()).toStrictEqual([1, 2]);
  });

  it('fn checkValueByCode', (): void => {
    expect(STATUS.checkValueByCode('AUDIT_PASS', 2)).toBeTruthy();
    expect(STATUS.checkValueByCode('AUDIT_PASS', 1)).toBeFalsy();
  });

  it('antd', (): void => {
    expect(STATUS.toFormOptions()).toStrictEqual([
      { extra: 'extra1', key: 1, label: '审核中', value: 1 },
      { extra: 'extra2', key: 2, label: '审核通过', value: 2 },
    ]);
    expect(STATUS.toFormOptions(true)).toStrictEqual([
      { extra: null, key: null, label: '全部', value: null },
      { extra: 'extra1', key: 1, label: '审核中', value: 1 },
      { extra: 'extra2', key: 2, label: '审核通过', value: 2 },
    ]);
    expect(STATUS.toFormValueEnum()).toStrictEqual({
      '1': { extra: 'extra1', status: undefined, text: '审核中' },
      '2': { extra: 'extra2', status: undefined, text: '审核通过' },
    });
  });
});
