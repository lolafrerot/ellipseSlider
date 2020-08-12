/*!
 * ellipseSlider v1
 * by E-magineurs
 *
 */

// Uses Node, AMD or browser globals to create a module.

function throttle(fn, wait) {

    var time = Date.now();
    return function () {

        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.ellipseSlider = factory(root.jQuery);
    }
}(this, function ($) {

    'use strict';

    function ellipseSlider(options) {
        this.init();

        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);

    }
    ellipseSlider.defaults = {
        element: '.slider',
        titreNav: 'h2',
        pagination: true,
        arrownav: true,
        autoplay: true,
        autoplayDuration: 7000
    }
    ellipseSlider.prototype.option = function (options) {
        $.extend(this.options, options);
        //console.log(this.options);
    }
    ellipseSlider.prototype.init = function () {
        var self = this;

        $(document).ready(function () {
            self.build();
        });

    }


    /***************************
    
    Initialisation
    
    ***************************/

    ellipseSlider.prototype.build = function () {
        let self = this;

        let touchEvents;
        if (Modernizr.touchevents) {
            touchEvents = true
        } else {
            touchEvents = false
        }

        this.$element = $(self.options.element).addClass('ellipseSlider');
        this.$sliderSlides = this.$element.children().wrapAll('<div class="ellipseSlider-inner"></div>');
        this.$wrapper = $(self.options.element).children('.ellipseSlider-inner');
        this.$sliderSlides.addClass('ellipseSlider-item')
        this.$activeItem = this.$sliderSlides.first().addClass('active');

        this.$numberItems = this.$sliderSlides.length;


        this.$titreNav = $(self.options.titreNav);
        this.$navigation = self.createNav();


        this.$widthSlide = $(window).width();
        this.$totalWidth = this.$widthSlide * this.$numberItems;

        self.createSlider();

        

        if (self.options.pagination) {
            self.createPagination();
        }

        if (self.options.arrownav) {
            this.$arrowNavigation = self.createArrowNav();
        }

        $(window).on('resize', function () {
            self.recalculate();
        })

        self.createSlide();
        /* Aniamtion des textes*/
        this.$animatedText = self.$element.find('.textillate');
        this.$animatedText2 = self.$element.find('.textillate-2');

        /* Animation de la première slide*/
        self.animateSlide(self.$activeItem);

        if (self.options.autoplay) {
            this.$autoplayDuration = self.options.autoplayDuration;
            let autoplay = self.createAutoplay(self);
            
        }

       
    }

    /***************************
    
    slidethis : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.slideThis = function (position, direction) {
        let self = this;
        
        if(self.$activeItem.hasClass('pair')){
            self.$sliderSlides.eq(position).removeClass('pair').addClass('impair');
        }
        else{
            self.$sliderSlides.eq(position).removeClass('impair').addClass('pair');
        }

        if(direction == 0){
            self.$sliderSlides.eq(position).addClass('reverse');
        }
        
        let color = self.$sliderSlides.eq(position).attr('data-color');
        self.$activeItem.removeClass('reverse').find(".mask-path2").attr("stroke", color)
        //document.querySelector(".ellipse-1").getSVGDocument().getElementsByClass("mask-path").setAttribute("fill", color)

        TweenMax.fromTo(".ellipseSlider .active .content", 0.5, {
            y: "0",
            opacity: 1
        }, {
            y: "100",
            opacity: 0
        });


        
        TweenMax.fromTo(".ellipseSlider .active .mask-path2", 0.5, {
            drawSVG: "25% 25%"
        }, {
            drawSVG: "25% 75%",
            ease: "ease.in",
            onComplete: doComplete,
             

        }, 0.5);

        function doComplete() {
            
            self.$sliderSlides.eq(position).addClass('activating');
            
            let cursor = self.$navigation.find('#sailor-2');
            let startCirle = (100 / self.$numberItems) / 2;
            
            let percent = (((position) * 100) / (self.$numberItems)) + startCirle/2;
            console.log(position);
            console.log(self.$activeItem.index());
            console.log(self.$numberItems);
            if(position == 0 && (self.$activeItem.index()+1) == self.$numberItems){
                
                TweenMax.to(cursor, 0.5, {

                    drawSVG: '0% 100%',
                    onComplete: resetNav

                })
                function resetNav(){
                    TweenMax.fromTo(cursor, 0, {

                        drawSVG: '0% 0%',

                    },
                                    {

                        drawSVG: '0% ' + percent + '%',

                    })
                }
            }
            else{
                TweenMax.to(cursor, 0.5, {

                    drawSVG: '0% ' + percent + '%',

                })
            }
            
            
            
            TweenMax.fromTo(".ellipseSlider .img-wrap img", 0.6, {
                scale: "1.1",
                opacity:0
            }, {
                scale: "1",
                opacity:1
            });
            

            TweenMax.fromTo(".ellipseSlider .active .mask-path", 0.5, {
                drawSVG: "25% 75%"
                
            }, {
                drawSVG: "75% 75%",
                 ease: "ease.out",
                onComplete: doComplete2


            }, 0.5);

            function doComplete2() {
                TweenMax.fromTo(".ellipseSlider .active .mask-path", 0, {
                    drawSVG: "25% 25%"
                }, {
                    drawSVG: "25% 75%",

                }, 0.1);
                TweenMax.fromTo(".ellipseSlider .active .mask-path2", 0, {
                    drawSVG: "25% 75%"
                }, {
                    drawSVG: "0% 0%",

                }, 0.1);


                self.$sliderSlides.removeClass('active');
                self.$activeItem.removeClass('pair').removeClass('impair').attr('aria-hidden', 'true');

                self.$activeItem = self.$sliderSlides.eq(position);
                self.$activeItem.attr('aria-hidden', 'false');
                self.$activeItem.addClass('active');
                self.$activeItem.removeAttr('style').removeClass('activating');
                TweenMax.fromTo(".active .content", 0.7, {
                    y: "-100",
                    opacity: 0
                }, {
                    y: "0",
                    opacity: 1
                });
                
                let titreSelector = self.$activeItem.attr('data-titreselect');
                self.$element.children('.text-animated').remove();
                self.$element.append('<span class="text-animated">'+titreSelector+'</span>');
                self.$element.children('.text-animated').textillate({ in: { effect: 'fadeInUp' } });
                
                
                 self.updateNav(position);
            }

            
        }


       

    }



    /***************************
    
    createSlider : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.createSlider = function () {
        let self = this;
         let touchEvents;
        if (Modernizr.touchevents) {
            touchEvents = true
        } else {
            touchEvents = false
        }
        console.log('touchevents: ' + touchEvents);
        //self.$wrapper.css('height', self.$totalWidth);
         
             
             if (touchEvents == true) {
            self.$element.swipe({

                    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                        console.log(direction);
                        if (direction == 'left') {
                            self.prev();
                        } else if (direction == 'right') {
                            self.next();
                        }
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold: 75
                });
            }
        

    }

    /***************************
    
    recaculate : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.recalculate = function () {
        let self = this;

        self.$widthSlide = $(window).height();
        self.$totalWidth = this.$widthSlide * this.$numberItems;
        //self.$wrapper.css('height', self.$totalWidth);

    }


    /***************************
    
    createDrag : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.createDrag = function () {
        let self = this;

        Draggable.create(this.$navigation.children('#sailor'), {
            type: "x",
            onDragEnd: function () {
                if (this.deltaX > 0) {
                    self.prev();
                   
                    if (self.$activeItem.index() == 0) {
                        self.slideThis(self.$activeItem.index(), 0);
                    }
                } else {
                    self.next();
                    if (self.$activeItem.index() == self.$numberItems - 1) {
                        self.slideThis(self.$activeItem.index(), 1);
                    }
                }
            }
        });
    }

    /***************************
    
    animateSlide : Anime la slide en paramètre
    
    ***************************/

    ellipseSlider.prototype.animateSlide = function (elem) {
        let self = this;

        self.texting(elem.find('.textillate'), elem.find('.textillate-2'));


    }



    /***************************
    
    texting : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.texting = function (elem, elem2) {
        let self = this;




        let animatedText = elem.textillate({
            initialDelay: 0,
            autoStart: false,
            in: {
                effect: 'fadeInUp'
            }
        });
        animatedText.textillate('start');
        animatedText.on('inAnimationBegin.tlt', function () {
            animatedText.removeClass('opacity');
        });




        let animatedText2 = elem2.textillate({
            initialDelay: 0,
            autoStart: false,
            in: {
                effect: 'bounceIn'
            }
        });
        animatedText2.textillate('start');
        animatedText2.on('inAnimationBegin.tlt', function () {
            animatedText2.removeClass('opacity');

        });




        //return animatedText;

    }

    /***************************
    
    createSlide : Crée les slides
    
    ***************************/

    ellipseSlider.prototype.createSlide = function () {
        let self = this;
        let numberSlides = self.$sliderSlides.length;
        let iterate = 0;

        function isOdd(num) {
            return num % 2;
        }
        self.$sliderSlides.each(function () {
            /*
            <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="800" viewBox="0 0 591.4 334.3">
                   <image width="500" height="250" xlink:href="assets/img/reveal.jpg" />
                    <circle class="mask-path" stroke-width="400" fill="transparent"  stroke="#555" id="outer" cx="300" cy="150" r="200" />                    
                </svg>
            */
            if(iterate == 0){
                $(this).addClass('pair');
            }
            let color = $(this).attr('data-color');
            console.log(color);
            let circle = $('<circle class="mask-path" stroke-width="400" fill="transparent"  stroke="' + color + '" id="outer" cx="300" cy="150" r="200" />');
            let imageSlide = $(this).find('.slider-img').attr('src');
            let ImageSvg = $('<img width="500" height="250" src="' + imageSlide + '" />')
            let svg = $('<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="800" viewBox="0 0 591.4 334.3"></svg>')


            // create the svg element
            const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            // set width and height
            svg1.setAttribute("width", "1500");
            svg1.setAttribute("height", "800");
            svg1.setAttribute("viewBox", "0 0 500 500");
            svg1.setAttribute("class", "ellipse-1");

            svg2.setAttribute("width", "1500");
            svg2.setAttribute("height", "800");
            svg2.setAttribute("viewBox", "0 0 500 500");
            svg2.setAttribute("class", "ellipse-2");

            // create a circle
            const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cir1.setAttribute("cx", "250");
            cir1.setAttribute("cy", "250");
            cir1.setAttribute("r", "400");
            cir1.setAttribute("fill", "transparent");
            cir1.setAttribute("stroke", color);
            cir1.setAttribute("stroke-width", '800');
            cir1.setAttribute("class", 'mask-path');

            const cir2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cir2.setAttribute("cx", "250");
            cir2.setAttribute("cy", "250");
            cir2.setAttribute("r", "400");
            cir2.setAttribute("fill", "transparent");
            cir2.setAttribute("stroke", color);
            cir2.setAttribute("stroke-width", '800');
            cir2.setAttribute("class", 'mask-path2');


            svg1.appendChild(cir1);
            svg2.appendChild(cir2);


            $(this).append(svg1);
            $(this).prepend(svg2);
            TweenMax.fromTo(".mask-path", 0, {
                drawSVG: "25% 25%"
            }, {
                drawSVG: "25% 75%",

            }, 0.5);
            TweenMax.fromTo(".mask-path2", 0, {
                drawSVG: "25% 75%"
            }, {
                drawSVG: "0% 0%",

            }, 0.5);
            iterate++;
        })
        
    }

    /***************************
    
    prev : go to slide précédente
    
    ***************************/
    ellipseSlider.prototype.prev = function (elem = null) {
        let self = this;
        let position;
        if (self.$activeItem == undefined) {
            self.$activeItem = elem;
        }
        position = self.$activeItem.index() - 1;
        if (position >= 0) {
            self.slideThis(position, 0);

        } else {
            position = self.$numberItems - 1;
            self.slideThis(position, 0);
        }
    }

    /***************************
    
    next : go to slide suivante
    
    ***************************/
    ellipseSlider.prototype.next = function (elem = null) {
        let self = this;
        let position;
        if (self.$activeItem == undefined) {
            self.$activeItem = elem;
        }
        position = self.$activeItem.index() + 1;
        
        if (position < self.$numberItems) {
            self.slideThis(position, 1);
        } else {
            position = 0;
            self.slideThis(position, 1);
        }


    }

    /***************************
    
    goToSlide : go to slide choisie, utilisée par les boutons de navigation
    
    ***************************/
    ellipseSlider.prototype.goToSlide = function (position) {
        let self = this;
        if(position > self.$activeItem.index()){
             self.slideThis(position, 1);
        }
        else{
             self.slideThis(position, 0);
        }
       
    }

    /***************************
    
    createNav : création de la liste des boutons de navigation
    
    ***************************/
    ellipseSlider.prototype.createNav = function (elem) {
        let self = this;
        let navigation = $('<ul id="ellipseSlider-nav"></ul>');
        self.$element.prepend('<span class="text-animated"></span>')
        self.$element.prepend(navigation);
        let iterate = 0;
        self.$sliderSlides.each(function (index) {
            let imgdot;
            let titreSelector = $(this).attr('data-titreselect');
            let titreSlide;
            if (titreSelector == null) {
                titreSelector = $(this).find('h2').text();
                if (titreSelector == "") {
                    titreSelector = $(this).find('h3').text();
                }
            } else {
                titreSelector = $(this).find(titreSelector).text();
            }
             $(this).attr('data-titreselect', titreSelector);

            let ellipseSliderDot = $('<li><button><span class="tip">' + titreSlide + '</span><span class="sr-only">' + index + '</span></button></li>');
            if(iterate == 0){
               ellipseSliderDot.children('button').attr('disabled', 'disabled').addClass('active');
               self.$element.children('.text-animated').text(titreSelector).textillate({ in: { effect: 'fadeInUp' }});
            }
            ellipseSliderDot.on("click", function () {
                let currentBtn = $(this);
                self.slideThis(index);

            });


            iterate++;
            

            navigation.append(ellipseSliderDot);

        })

        let radius = 150; // radius of the circle
        let fields = navigation.children('li'),
            width = 300,
            height = 300,
            angle = 5,
            step = (2 * Math.PI) / fields.length;

        fields.each(function () {
            var x = Math.round(width / 2 + radius * Math.cos(angle)),
                y = Math.round(height / 2 + radius * Math.sin(angle));
            $(this).css({
                left: x + 'px',
                top: y + 'px'
            });
            angle += step;
        });

        const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");


        // set width and height

        svg1.setAttribute("viewBox", "0 0 500 500");
        svg1.setAttribute("id", "sailor");


        // create a circle
        const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cir1.setAttribute("cx", "250");
        cir1.setAttribute("cy", "250");
        cir1.setAttribute("r", "250");
        cir1.setAttribute("fill", "transparent");
        cir1.setAttribute("stroke", '#b1b1b1b8');
        cir1.setAttribute("stroke-width", '2');
        cir1.setAttribute("id", 'sailor-1');

        const cir2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cir2.setAttribute("cx", "250");
        cir2.setAttribute("cy", "250");
        cir2.setAttribute("r", "250");
        cir2.setAttribute("fill", "transparent");
        cir2.setAttribute("stroke", '#fff');
        cir2.setAttribute("stroke-width", '2');
        cir2.setAttribute("id", 'sailor-2');

        svg1.appendChild(cir1);
        svg1.appendChild(cir2);



        navigation.append(svg1);
        let startCirle = (100 / self.$numberItems) / 2;
        TweenMax.to(cir2, 0, {

            drawSVG: '0% ' + (startCirle/2) + '%'
        })



        return navigation;

    }

    /***************************
    
    createNav : création de la liste des boutons de navigation
    
    ***************************/
    ellipseSlider.prototype.createArrowNav = function (elem) {
        let self = this;


        let arrowNav = $('<div class="ellipseSlider-arrows"></div>');

        let prevButton = document.createElement('button')
        prevButton.innerHTML = "<span class='sr-only'>Précédent</span>";
        prevButton.setAttribute('id', 'ellipseSlider-prev');


        let nextButton = document.createElement('button')
        nextButton.innerHTML = "<span class='sr-only'>Suivant</span>";
        nextButton.setAttribute('id', 'ellipseSlider-next');

        prevButton.addEventListener('click', function (e) {
            self.prev();
        })

        nextButton.addEventListener('click', function (e) {
            self.next();
        })

        arrowNav.append(prevButton).append(nextButton);
        self.$element.append(arrowNav);

        return arrowNav;

    }

    /***************************
    
    createPagination : création de la liste des boutons de navigation
    
    ***************************/
    ellipseSlider.prototype.createPagination = function (elem) {
        let self = this;


        let pagination = $('<div aria-hiden="true" class="ellipseSlider-paginate"></div>');
        let currentSlide = $('<span class="ellipseSlider-current">01</span>');
        let totalSlide = $('<span>0' + self.$numberItems + '</span>')

        pagination.append(currentSlide);
        pagination.append(totalSlide);
        self.$element.append(pagination);

    }

    /***************************
    
    updateNav : gestion des animations entre slides
    
    ***************************/

    ellipseSlider.prototype.updateNav = function (position) {
        let self = this;

        console.log(self.$navigation);
        
        self.$navigation.find('button').removeClass('active').removeAttr('disabled');
        self.$navigation.children('li').eq(position).children('button').addClass('active').attr('disabled', 'disabled');


        if (self.options.pagination) {
            self.$element.find('.ellipseSlider-current').text('0' + (position+1))
        }
    }

    /***************************
    
    createAutoplay : création de la gestion de l'autoplay
    
    ***************************/
    ellipseSlider.prototype.createAutoplay = function (elem) {
        let self = elem;
        console.log(elem);
        
        setInterval(function(){ elem.next(elem.$activeItem); }, self.$autoplayDuration);

    }


    return ellipseSlider;
}));
