// eslint-disable-next-line import/no-named-as-default
import BracketEnum from '.';

describe('BracketEnum test', (): void => {
  const STATUS = BracketEnum.of([
    ['AUDIT_WAIT', [1, '审核中', 'extra1']],
    ['AUDIT_PASS', [2, '审核通过', 'extra2']],
  ]);

  it('test fn getValueByCode', (): void => {
    expect(STATUS.getValueByCode('AUDIT_PASS')).toBe(2);
  });

  it('test fn getDescByCode', (): void => {
    expect(STATUS.getDescByCode('AUDIT_WAIT')).toBe('审核中');
  });

  it('test fn getDescByValue', (): void => {
    expect(STATUS.getDescByValue(2)).toBe('审核通过');
  });

  it('test fn getAllValues', (): void => {
    expect(STATUS.getAllValues()).toStrictEqual([1, 2]);
  });

  it('test fn checkValueByCode', (): void => {
    expect(STATUS.checkValueByCode('AUDIT_PASS', 2)).toBeTruthy();
    expect(STATUS.checkValueByCode('AUDIT_PASS', 1)).toBeFalsy();
  });
});
