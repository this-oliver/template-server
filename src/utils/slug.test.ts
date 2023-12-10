import { expect } from 'chai';
import { createSlug, isSlug } from './slug';


describe('Slug Util', () => {
	describe('createSlug()', () => {
		it('should return a string', () => {
			const result = createSlug('sample');
			expect(result).to.be.a('string');
		});

		it('should throw an error if input is empty', () => {
			expect(() => createSlug('')).to.throw();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => createSlug(undefined as any)).to.throw();
		});
	});

	describe('isSlug()', () => {
		it('should return true if string is slug-like', () => {
			const validSlugs = ['sample', 'sample-slug', 'sample-slug-1', 'sample-slug-1-2'];
			for(const slug of validSlugs){
				const result = isSlug(slug);
				expect(result).to.be.true;
			}
      
		});

		it('should return false if string is not slug-like', () => {
			const invalidSlugs = ['sample slug', 'sample_slug', 'sample/slug', 'sample.slug'];
			for(const slug of invalidSlugs){
				const result = isSlug(slug);
				expect(result).to.be.false;
			}
		});
	});
});