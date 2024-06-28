
https://stackoverflow.com/questions/67799233/how-to-upload-image-via-javascript

var reader1 = new FileReader();

reader1.addEventListener('load', e => {
  document.querySelector('#img').src = e.target.result;
});

document.addEventListener('DOMContentLoaded', e => {
  document.forms.pickfile.file.addEventListener('change', e => {
    reader1.readAsDataURL(e.target.files[0]);
  });
});
<form name="pickfile">
  <input name="file" type="file" />
</form>
<img id="img" />
