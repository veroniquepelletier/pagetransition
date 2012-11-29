var navigationView = {
    id: 0,
    history: [],
    pageWidth: 0,
    speed: 500,
    el: null,
    btn_foward,
    btn_back,
    
    init: function (el, btn_foward, btn_back) {
        this.el = el;
        this.btn_foward = btn_foward;
        this.btn_back = btn_back;
    },
    
    addPage: function () {
        var $newPage = $('<div class="page"></div>');
        $newPage.attr('id', this.id);
        this.id = this.id + 1;
        this.history.push($newPage);
        this.el.append($newPage);
        $newPage.animate({left:'0px'}, this.speed);
        // move the current one out of the way
        if(this.history.length > 1) {
            this.history[this.history.length - 2].animate({left: '-630px'}, this.speed);
        }
    },
    
    removePage: function () {
        if(this.history.length > 1) {    // keep min 1 page
            var $removedPage = this.history.pop();
            var $newCurrentPage = this.history[0];
            $newCurrentPage.animate({left:'0px'}, this.speed);
            $removedPage.animate({left:'680px'}, this.speed,  function() {
                $removedPage.remove();
            });
        }
    },
    
    update: function () {
        // TODO :: update with orientation changed 
    },
    
    addListeners: function () {
        btn_foward.click($.proxy(this.addPage, this));
        btn_back.click($.proxy(this.removePage, this));
    }
    
}


navigationView.init($('.app'), $('.btn_foward'), $('.btn_back'))
navigationView.addPage();
navigationView.addListeners();
