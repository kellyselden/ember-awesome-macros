module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Firefox'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Firefox: {
      mode: 'ci',
      args: [
        '-headless'
      ]
    }
  }
};
