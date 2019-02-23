$(document).ready(function () {
  $('.load-games').on('click', function() {
    getPokeList();
  });

  $('.load-moves').on('click', function() {
    getPokeMoves();
  });
})


function getPokeList(){  
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=10',
    method: 'GET',
    success: (resp) => {
      build(resp)
    },
    error: (err) => {
    
    }
  })
}

function getPokeMoves(){  
  $.ajax({
    url: 'https://pokeapi.co/api/v2/move/?limit=10',
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
      <td><button type="button"  value='${val.url}' class="btn btn-dark">Detalhes</button></td>
    </tr>
    `
  });

  $('.main-tbody').html(content);

}
