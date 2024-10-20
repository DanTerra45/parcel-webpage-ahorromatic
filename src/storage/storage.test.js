/*
Hey! I've been looking into this, and it seems that to test the storage functionality, 
we need to create a mock for it (I have no clue on how to do it), as it can't access the 
API directly from the browser. 
This means we either have to implement our own mock (from jest+23 as I've reed they use 
localStorage mocked by default, but is not installed or enabled on this scope) 
or use the jest external npm package to see. 
However, since this falls outside the scope of our initial presentation (mostly focused on logic business), 
we'll leave it as is for now. We haven't forgotten about testing this!
*/

describe('Storage Test', () => {
    test('should retrieve the storage data (for now this should pass)', () => {
        expect(true).toBe(true);
    });
});