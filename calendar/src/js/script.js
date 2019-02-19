/**
 * Created by Deonisiu on 19.02.2019.
 */

$(document).ready(function () {
    const WEEK_DAYS = 7;
    const SHOWN_DAYS = 35;
    var calendarArr;

    // Загрузка данных по календарю
    $.post('calendar.php', { get : true }, function (answer) {
        calendarArr = answer;

        // Создание дат
        var currDate = new Date();
        var searchDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        searchDate.setDate(searchDate.getDate() - (searchDate.getDay() - 1));

        // Формирование таблицы календаря
        $('.table__body').append("<tr>");
        for(var i=1; i < SHOWN_DAYS + 1; i++){

            // Формирование ячейки td
            var result = "<td class='td ";
            result += " " + i-1;
            if(currDate.getMonth() === searchDate.getMonth()){
                result += " td--current";

                if(calendarArr[i-1] === '1') {
                    result += " td--closed";
                } else {
                    result += " td--active";
                }
            }

            result += "'>" + searchDate.getDate() + "</td>";
            $('.table__body').append(result);
            searchDate.setDate(searchDate.getDate() + 1);

            // Сохранение выбранных дат в массив
            $('.' + (i-1)).click(function (event) {
                if($(this).hasClass("td--active")) {
                    var classArr = $(this).attr('class').split(' ');
                    calendarArr[classArr[1]] = calendarArr[classArr[1]] === '0' ? '1' : '0';
                }
            });

            // Через 7 дней новая строка tr
            if(i % WEEK_DAYS === 0){
                $('.table__body').append("</tr><tr>");
            }
        }
        $('.table__body').append("</tr>");

        // Добавление аттрибута title
        $('.td--active').attr('title', "Свободно");
        $('.td--closed').attr('title', "Занято");

        // Обработка нажатия доступных дат
        $('.td--active').click(function (event) {
            $(this).toggleClass('td--selected');

            // Показать или скрыть кнопку
            if($('.td').hasClass('td--selected')){
                $('.save__button').removeClass('hidden');
            } else {
                $('.save__button').addClass('hidden');
            }
        });
    }, "json");

    // Сохранение данных
    $(".save__button").click(function (event) {
        $.post('calendar.php', { save : calendarArr }, function (answer) {
            // Реакция на ответ с сервера
            $('.save__button').addClass('hidden');
            $('.save__text').removeClass('hidden');
        });
    });
});