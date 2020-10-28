jQuery(document).ready(function() {
    //Filter News
    $('.filter-box').click(function(e) {
        $('.filter-box.active').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).attr('data-category-target');
        filterList(filter);
    });

    //News filter function
    function filterList(value) {
        var list = $(".noticias .noticia-container");
        $(list).fadeOut("fast");
        if (value == "All") {
            $(".noticias").find(".noticia-container").each(function(i) {
                $(this).delay(200).slideDown("fast");
            });
        } else {
            //Notice this *=" <- This means that if the data-category contains multiple options, it will find them
            //Ex: data-category="Cat1, Cat2"
            $(".noticias").find(".noticia-container[data-category*=" + value + "]").each(function(i) {
                $(this).delay(200).slideDown("fast");
            });
        }
    }

});