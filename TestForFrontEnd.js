var ponys = [
    {
        "name": "Твайлайт",
        "color": "Фиолетовый",
        "kind": "Единорог",
        "price": 19.99,
        "is_new": false
    },
    {
        "name": "Нимбус",
        "color": "Синий",
        "kind": "Земная пони",
        "price": 25.00,
        "is_new": false
    },
    {
        "name": "Монокай",
        "color": "Синий",
        "kind": "Аликорн",
        "price": 15.99,
        "is_new": false
    },
    {
        "name": "Солар",
        "color": "Золотой",
        "kind": "Пегас",
        "price": 29.49,
        "is_new": true
    },
    {
        "name": "Корн",
        "color": "Коричневый",
        "kind": "Земная пони",
        "price": 18.44,
        "is_new": false
    },
    {
        "name": "Фаер",
        "color": "Красный",
        "kind": "Пегас",
        "price": 34.44,
        "is_new": true
    },
    {
        "name": "Сибериан",
        "color": "Фиолетовый",
        "kind": "Единорог",
        "price": 40.00,
        "is_new": true
    }
];

function maxPrice() {
    var max = ponys[0]["price"];
    for (i = 1; i < ponys.length; i++) {
        if (max <= ponys[i]["price"]) {
            max = ponys[i]["price"];
        }
    }
    return Number(max);
}

function minPrice() {
    var min = ponys[0]["price"];
    for (i = 1; i < ponys.length; i++) {
        if (min >= ponys[i]["price"]) {
            min = ponys[i]["price"];
        }
    }
    return Number(min);
}

function show(s_price, f_price, color, kind, is_new) {
    var query = [];
    for (i = 0; i < ponys.length; i++) {
        if (
                (color === "undefined" || ponys[i]["color"] === color) &
                (kind === "undefined" || ponys[i]["kind"] === kind) &
                ponys[i]["price"] >= s_price &
                ponys[i]["price"] <= f_price &
                (is_new === "undefined" || ponys[i]["is_new"] == is_new)
                )
        {
            query[query.length] = (ponys[i]);
        }
    }
    $(document).ready(function () {
        var length;
        if (query.length >= 20) {
            length = 20;
        } else {
            length = query.length;
        }
        for (i = 0; i < length; i++) {
            var is_new;
            if (query[i]["is_new"] === true) {
                is_new = "Да";
            } else {
                is_new = "Нет";
            }
            var pony_content = '<div class="pony">\n\
                                <h4>' + query[i]["name"] + '</h4>\n\
                                <p>Цвет: ' + query[i]["color"] + '</p>\n\
                                <p>Вид: ' + query[i]["kind"] + '</p>\n\
                                <p>Цена: ' + query[i]["price"] + '</p>\n\
                                <p>Новый: ' + is_new + '</p></div>';
            $(".products").append(pony_content);
        }
    });
}
show(minPrice(), maxPrice(), "undefined", "undefined", "undefined");

function filter() {
    $(document).ready(function () {
        var content = $('.filter').html();
        var filter_content = '\
                                <a href="#" id="close_overlay">Скрыть</a>\n\
                                <form>\n\
                                <label for="amount">Диапазон цен:</label>\n\
                                <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">\n\
                                <div class="range_slider"></div>\n\
                                <span>Цвет:</span>\n\
                                <select id="color">\n\
                                    <option value="undefined">-</option>\n\
                                    <option value="Фиолетовый">Фиолетовый</option>\n\
                                    <option value="Синий">Синий</option>\n\
                                    <option value="Золотой">Золотой</option>\n\
                                    <option value="Коричневый">Коричневый</option>\n\
                                    <option value="Красный">Красный</option>\n\
                                </select><br>\n\
                                <span>Вид:</span>\n\
                                <select id="kind">\n\
                                    <option value="undefined">-</option>\n\
                                    <option value="Земная пони">Земная пони</option>\n\
                                    <option value="Единорог">Единорог</option>\n\
                                    <option value="Пегас">Пегас</option>\n\
                                    <option value="Аликорн">Аликорн</option>\n\
                                </select><br>\n\
                                <span>Новый:</span>\n\
                                <select id="is_new">\n\
                                    <option value="undefined">-</optin>\n\
                                    <option value="1">Да</optin>\n\
                                    <option value="0">Нет</optin>\n\
                                </select><br>\n\
                                <a href="#" id="submit">Найти</a>\n\
                              </form>';
        $('.filter').empty();
        $(".filter").append(filter_content);
        var s_price;
        var f_price;
        $(".range_slider").slider({
            range: true,
            min: minPrice(),
            max: maxPrice() + 1,
            values: [minPrice(), maxPrice() + 1],
            slide: function (event, ui) {
                s_price = ui.values[0];
                f_price = ui.values[1];
                $("#amount").val(ui.values[0] + " руб. - " + ui.values[1] + " руб.");
            }
        });
        $("#amount").val($(".range_slider").slider("values", 0) + " руб. - " + $(".range_slider").slider("values", 1) + " руб.");
        $("#submit").click(function () {
            var color = $('#color').val();
            var kind = $('#kind').val();
            var is_new = $('#is_new').val();
            var prices = $('#amount').val().replace(new RegExp(" руб.", 'g'), "s");
            console.log(s_price);
            $(".products").empty();
            show(s_price, f_price, color, kind, is_new);
        });
        $("#close_overlay").click(function () {
            $('.filter').empty();
            $('.filter').append(content);
        });
    });
}