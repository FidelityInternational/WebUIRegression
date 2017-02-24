module.exports = function () {
  casper.start(url, function () {
    this.echo("\n-----------------------------");
    this.echo("CasperJS " + this.mode + " Started");
    browserConfig.setBrowserConfig(browser, casper);
    this.waitForUrl(url, function () {
        capture.captureSelector('body', this);
        this.echo('Landing Page Captured');
        this.echo('Navigating to Doodles Page');
        //this.click(x('//*[@class="jsb"]//input[@name="btnI"]'));
        //this.echo('Button clicked');
      },
      function () {
        this.echo('Error Occurred while loading Landing Page');
        this.die("Something is wrong");
      }, 10000);
  });

};