import { MeanLogMyScorePage } from './app.po';

describe('mean-log-my-score App', function() {
  let page: MeanLogMyScorePage;

  beforeEach(() => {
    page = new MeanLogMyScorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lms works!');
  });
});
