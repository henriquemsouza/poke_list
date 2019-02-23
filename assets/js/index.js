$(document).ready(function () {
  $('.load-games').on('click', function() {
    getPokeList();
  });
})


function getPokeList(){  
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=10',
    method: 'GET',
    success: (resp) => {

      console.log(resp)
      build(resp)
    },
    error: (err) => {
    
    }
  })

}


function build(resp){
  let content = '';
  $.each(resp.results, function (i, val) {
    content += `
    <tr>
      <td>${val.name}</td>
      <td><a href="${val.url}" class="badge badge-dark">Dark</a></td>
    </tr>
    `
  });

  $('.main-tbody').html(content);

}
