$(document).ready(function () {
  // Función o Método, para buscar los datos de un pokemon por AJAX a la Api de Pokemon
  $("#btnBuscar").click(function (e) {
    e.preventDefault();
    var nombrePokemon = $("#campoBuscar").val().toLowerCase();
    if (nombrePokemon) {
      buscarPokemon(nombrePokemon);
    }

  });

  $("#btnLimpiar").click(function (e) {
    e.preventDefault();
    $("#pokemon-container").empty();
    $('#campoBuscar').val('');
  });

  function buscarPokemon(pokemon) {
    $.ajax({
      type: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
      dataType: "json",
      success: function (data) {
        renderPokeData(data)
      }
    });
  }

  function renderPokeData(data) {
    let div = $("<div></div>");
    div.addClass("poke card");

    let name = $("<h3></h3>");
    name.addClass("card-title");
    name.append(data.id + " " + data.name.toUpperCase());
    div.append(name);

    let img = $("<img></img>");
    img.attr("src", data.sprites.other["official-artwork"].front_default);
    img.addClass("card-img");
    div.append(img);

    let body = $("<div></div>");
    body.addClass("card-body");

    var pokeType = data.types;
    var tipos = '';
    pokeType.forEach(function (type) {
      if (pokeType.length > 1 && !pokeType.length.last) {
        tipos += `${type['type']['name']} - `.toUpperCase();
      } else {
        tipos += `${type['type']['name']}`.toUpperCase();
      }

    })
    body.append(`<div>Tipo: ${tipos}<div>`);
    div.append(body);

    $('#pokemon-container').append(div);
  }


});
