$(document).ready(function () {
  $('.load-games').on('click', function () {
    getPokeList($('.amount').val());
  });

  $('.load-moves').on('click', function () {
    getPokeMoves($('.amount').val());
  });
})


function getPokeList(amount) {
  if(!amount){
    amount = 20
  }
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/?limit=${amount}`,
    method: 'GET',
    success: (resp) => {
      build(resp)
    },
    error: (err) => {

    }
  })
}

function getPokeMoves(amount) {
  if(!amount){
    amount = 20
  }
  $.ajax({
    url: `https://pokeapi.co/api/v2/move/?limit=${amount}`,
    method: 'GET',
    success: (resp) => {

      console.log(resp)
      build(resp)
    },
    error: (err) => {

    }
  })

}

function build(resp) {
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
