$(document).ready(function(){

    function rotator( $domNode ) {

        // layers
        var $currentPosition = $('.js-currentPosition', $domNode).first();
        var $targetPosition  = $('.js-targetPosition', $domNode).first();

        // info values
        var $current         = $('.js-current', $domNode).first();
        var $target          = $('.js-target', $domNode).first();

        // buttons
        var $set             = $('.js-set', $domNode).first();
        var $rand            = $('.js-rand', $domNode).first();

        function rotate($element, degree) {
            $element.css({
                '-webkit-transform': 'rotate(' + degree + 'deg)',
                   '-moz-transform': 'rotate(' + degree + 'deg)',
                    '-ms-transform': 'rotate(' + degree + 'deg)',
                     '-o-transform': 'rotate(' + degree + 'deg)',
                        'transform': 'rotate(' + degree + 'deg)'
            });
        }

        setInterval(function(){

            $.getJSON( "backend/?action=status", function( data ) {

                console.log( data.currentPosition );

                rotate( $currentPosition, data.currentPosition );
                rotate( $targetPosition,  data.targetPosition );

                $current.text( data.currentPosition );
            });

        }, 250);


        $set.on('click', function(e) {

            e.preventDefault();

            $.post( "backend/?action=setAngle", {
                angle: $target.val()
            });

        });

        $rand.on('click', function(e) {

            e.preventDefault();

            $.post( "backend/?action=reset" );

        });
    }

    rotator( $('.js-first') );
    rotator( $('.js-second') );
    rotator( $('.js-third') );

});
