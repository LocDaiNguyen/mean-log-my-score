import { browser, element, by } from 'protractor';

export class MeanLogMyScorePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lms-root h1')).getText();
  }
}
