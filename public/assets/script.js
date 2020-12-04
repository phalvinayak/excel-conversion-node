class App {
  constructor() {
    this.$form = $('#form-upload')
    this.$fileInput = this.$form.find('#upload');
    this.$loader = this.$form.find('.loader');
    this.$downloadBox = this.$form.find('.download-box');
    this.$downloadButton = this.$downloadBox.find('a');
  }

  init() {
    this.bindUIEvents()
  }

  bindUIEvents() {
    this.$fileInput.on('change', this.handleFileInput);
    this.$downloadButton.on('click', (e) => {
      this.$downloadBox.hide();
      this.$form.trigger("reset");
    });
  }

  handleFileInput = (e) => {
    console.log('Triggered change');
    const fileName = e.target.files[0].name;
    this.$loader.show();
    const fileExt = /(xlsx|xls)$/i
    if(fileExt.test(fileName)) {
      this.fileUpload();
    } else {
      alert('Please select valid Excel file with xls or xlsx extension');
      this.$loader.hide();
    }
  }

  fileUpload = () => {
    $.ajax({
      url: this.$form.attr('action'),
      type: 'POST',
      data: new FormData(this.$form[0]),
      processData: false,
      contentType: false,
      cache:false
    }).done(response => {
      if(response.status){
        this.$downloadBox.show();
        this.$downloadButton.attr('href', response.downloadLink);
      }
    }).fail(err => {
      console.log(err);
      alert(`Unable to upload the file: ${err.statusText}`);
    }).always(() => {
      this.$loader.hide();
    });
  }
}

$(() => {
  console.log('ready');
  const app = new App();
  app.init();
});