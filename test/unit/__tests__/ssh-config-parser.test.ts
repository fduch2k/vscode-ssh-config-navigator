import { getNextHost } from '../../../src/ssh-config-parser';

describe('getNextHost', () => {
    it('should return an iterator with the next host', () => {
        const text = 'host1 host2';
        const iterator = getNextHost(text);

        expect(iterator.next().value).toBe('host1');
        expect(iterator.next().value).toBe('host2');
        expect(iterator.next().done).toBe(true);
    });

    it('should handle empty input', () => {
        const text = '';
        const iterator = getNextHost(text);

        expect(iterator.next().done).toBe(true);
    });

    it('should handle quoted host strings', () => {
        const text = `"host1" 'host2'`;
        const iterator = getNextHost(text);

        expect(iterator.next().value).toBe('host1');
        expect(iterator.next().value).toBe('host2');
        expect(iterator.next().done).toBe(true);
    });

    it('should handle quotes in middle of host string', () => {
        const text = `"hos't1" 'ho"st2' ho"s't3`;
        const iterator = getNextHost(text);

        expect(iterator.next().value).toBe('hos\'t1');
        expect(iterator.next().value).toBe('ho"st2');
        expect(iterator.next().value).toBe('ho"s\'t3');
        expect(iterator.next().done).toBe(true);
    })
});
