$(document).ready(function () {
  $('.load-games').on('click', function () {
    getPokeList($('.amount').val());
  });

  $('.load-moves').on('click', function () {
    getPokeMoves($('.amount').val());
  });
})


function getPokeList(amount) {
  if (!amount) {
    amount = 20
  }
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/?limit=${amount}`,
    method: 'GET',
    success: (resp) => {
      build(resp, 'poke')
    },
    error: (err) => {

    }
  })
}

function getPokeMoves(amount) {
  if (!amount) {
    amount = 20
  }
  $.ajax({
    url: `https://pokeapi.co/api/v2/move/?limit=${amount}`,
    method: 'GET',
    success: (resp) => {
      build(resp, 'move')
    },
    error: (err) => {

    }
  })

}

function build(resp, type) {
  $('.main-tbody').html('');
  let content = '';
  $.each(resp.results, function (i, val) {
    content += `
    <tr>
      <td>${val.name}</td>
      <td class="more-info-${i}"></td>
      <td> <input type="button" data-link='${val.url}' data-number='${i}' data-type='${type}' class='btn btn-dark more-inf' value="Detalhes"></td>
    </tr>
    `
  });
  $('.main-tbody').html(content);
}

function moreInfoPoke(e) {
  let url = $(e).data('link');
  let number = $(e).data('number');
  $(`.more-info-${number}`).html('');

  $.ajax({
    url: url,
    method: 'GET',
    success: (resp) => {
      console.log(resp)
      buildPokeInfo(resp, number);
    },
    error: (err) => {

    }
  })
}

function buildPokeInfo(resp, number) {
  let game_indices = '';
  $.each(resp.game_indices, function (i, val) {
    game_indices += `
    <p class="game-name">${val.version.name}</p>
    `
  });

  let types = [];
  $.each(resp.types, function (i, val) {
    types.push(val.type.name)
  });
  let moves = '';
  $.each(resp.moves, function (i, val) {
    moves += `
    <p>${val.move.name}</p>
    `
  });


  let content = `
<div class="nes-container is-dark with-title">
   <p class="title">${resp.name}</p>
   <table class="info-table">
   <tbody >
    <tr>
        <td>
          <p>Peso: ${resp.weight}</p>
          <p>Tipo: ${types}</p>
          <p>Experiência Base: ${resp.base_experience}</p>
          <p>Aparece nos jogos:<p/>
             ${game_indices}
        </td>
        <td>
          <div class="row">
            <img src="${resp.sprites.front_default}" alt="front_default">
            <img src="${resp.sprites.back_default}" alt="back_default">
          </div>
          <div class="row">
            <img src="${resp.sprites.front_shiny}" alt="front_shiny">
            <img src="${resp.sprites.back_shiny}" alt="back_shiny">
          </div>
        </td>
        <td>
          <p>Movimentos aprendidos:<p>
          ${moves}
        </td>
      </tr>
   </tbody>
   </table>
 </div>`;
  $(`.more-info-${number}`).html(content);

}


$(function () {
  $(document).on("click", '.more-inf', function () {
    let type = $(this).data('type');
    if (type == 'poke') {
      moreInfoPoke(this)
    } else {
      let number = $(this).data('number');
      let temp_msg = `<div class="message -right">
                      <div class="nes-balloon from-right">
                        <p>?????</p>
                      </div>
                    </div>`
      $(`.more-info-${number}`).html(temp_msg);
    }

  });
});