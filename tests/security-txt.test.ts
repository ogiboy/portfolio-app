import { describe, expect, it } from 'vitest';
import { GET } from '@/app/.well-known/security.txt/route';
import { siteUrl } from '@/lib/site-url';

describe('security.txt', () => {
  it('publishes a canonical RFC 9116 contact policy', async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8');
    expect(body).toContain('Contact: mailto:ogi@oguzcantoptas.com');
    expect(body).toContain('Expires: 2027-07-22T23:59:59.000Z');
    expect(body).toContain(`Canonical: ${siteUrl('/.well-known/security.txt')}`);
    expect(body).toContain('Preferred-Languages: en, tr');
  });
});
