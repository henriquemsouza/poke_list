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
      build(resp)
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
      build(resp)
    },
    error: (err) => {

    }
  })

}

function build(resp) {
  $('.main-tbody').html('');
  let content = '';
  $.each(resp.results, function (i, val) {
    content += `
    <tr>
      <td>${val.name}</td>
      <td class="more-info-${i}"></td>
      <td> <input type="button" data-link='${val.url}' data-number='${i}' class='btn btn-dark more-inf' value="Detalhes"></td>
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
      let abilities = '';
      $.each(resp.abilities, function (i, val) {
        abilities += `
        <p>Habilidade: ${val.ability.name}</p>
        `
      });
      let content = `
     <div class="nes-container is-dark with-title">
        <p class="title">${resp.name}</p>
        <div class="row">
          <div class="col-md-4">
          <p>Peso: ${resp.weight}</p>
          <p>Experiência Base: ${resp.base_experience}</p>
          ${abilities}
        </div>
        <div class="col-md-4">
          <div class="row">
            <img src="${resp.sprites.front_default}" alt="front_default">
            <img src="${resp.sprites.back_default}" alt="back_default">
            </div>
          </div>
        </div>
      </div>`;
      $(`.more-info-${number}`).html(content);
    },
    error: (err) => {

    }
  })
}


$(function () {
  $(document).on("click", '.more-inf', function () {
    moreInfoPoke(this)
  });
});