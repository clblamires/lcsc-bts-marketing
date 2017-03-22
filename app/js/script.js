'use strict';

// document ready
$(document).ready( function(){

    // run foundation methods for UI
    $(document).foundation();

    // taglines for the showcase
    var taglines = [
        "More Bang For Your Buck" ,
        "Get Experience Before You Graduate" ,
        "Live the Life You Dreamed" ,
        "Earn As You Learn" 
    ];
    var i = 0; // starting position in the taglines
    var timer = setInterval( changeTagline , 3500 );
    function changeTagline( ){
        $('#showcase-tagline').fadeOut('slow', function(){
            $(this).text( taglines[i] ).fadeIn('slow');
        });
        i++;
        if( i >= taglines.length ) i = 0; // reset the counter, yay!
    }


    $('#menu a').each(function(){
        $(this).click(function(e){
            e.preventDefault();
            var href = $(this).attr("href");
            $('html,body').animate({
                scrollTop: $(href).offset().top - 100
            }, 1200)
        })
    })


    // countdown at the top of the page
    // $('#countdown').countdown( "2017/03/22", function(ev){ 
    //     $(this).text(
    //         ev.strftime('%-D day%!D %-H hour%!H %-M minute%!H and %-S second%!S')
    //     );
    // })
    // .on('finish.countdown', function(){
    //     $(this).text(
    //         "The showcase is over. Contact us for details on future showcases"
    //     )
    // });


    // load the programs
    $.ajax({
        url: "data/programs.json",
        type: "get" ,
        dataType: "json"
    }).then( function(data){
        let programs = data.program;
        $.each( programs , function( i, program ){
            let column = $('<div></div>').addClass('small-12 medium-4 columns');
            let a = $('<a></a>').addClass("program-link").click(function(){
                loadProgram( program );
            });
            let div = $('<div></div>').addClass("program");
            let h3 = $('<h3></h3>').text( program.tags[0] );
            let h4 = $('<h4></h4>').text( program.name );

            div.append( h3 ).append( h4 );
            a.append( div );
            column.append( a );
            $('#program-list').append( column );
        })
    });

    // contact form
    $('#contact-form').submit( function(e){
        var formData = $(this).serialize();
        $('#submit-button')
            .attr("disabled","disabled")
            .empty()
            .html('<i class="fa fa-circle-o-notch fa-spin"></i>');
        $('input, textarea').attr("disabled","disabled");
        e.preventDefault();
        
        console.log(formData);
        console.log("FORM DATA");
        var ajaxOptions = {
            type: 'POST' ,
            url: $(this).attr('action') ,
            data: formData
        }
        $.ajax( ajaxOptions )
            .done(function(response){
                console.log(response);
                $('#form_message').addClass("success").removeClass("hide").text(response);
                $('#submit-button')
                    .removeAttr("disabled")
                    .empty()
                    .text("Submit");
                $('input, textarea').removeAttr("disabled");
                var timer = setTimeout( function(){
                    $('#form_message').removeClass("success").addClass("hide");
                }, 5000 );
            })
            .fail(function(data){
                console.log(data.responseText);
                $('#form_message').addClass("alert").removeClass("hide").text(data.responseText);
                
                $('#submit-button')
                    .removeAttr("disabled")
                    .empty()
                    .text("Submit");
                $('input, textarea').removeAttr("disabled");
            })
    })



    $('#scroll-top').click(function(){
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    })
});


// loadProgram - creates individual modals for each program
function loadProgram( p ){
    let $modal = $('#modal');
    $modal.html(''); // clear everything from the modal

    // program name
    let h3 = $('<h3></h3>').text( p.name );

    // tags
    let tags = $('<p></p>');
    $.each( p.tags, function(i,tag){
        let t = $('<span></span>').addClass('program-tag').text( tag );
        tags.append( t );
    })

    // jobs
    let jobsText = "Career options include " + p.jobs.join(", ") + " and more";
    let jobs = $('<p></p>').text( jobsText );

    // degrees
    let degreesText = "Degrees: " + p.name + ": " + p.degrees.join(", ");
    let degrees = $('<p></p>').text( degreesText ).addClass("program-degrees");
    
    // learn more button
    let learnmore = $('<a></a>').addClass("button large alert").attr("href", p.link).attr("target", "_blank").text('Learn More ');//' );
    // let faIcon = $('<i></i>').addClass("fa").addClass( p.faIcon );
    // learnmore.append( faIcon );

    // close button
    let button = $('<button></button>').addClass("close-button").attr("data-close", '').attr("type","button");
    let x = $('<span></span>').text( "x" );
    button.append( x );
    

    $modal.append( h3 ).append( tags ).append( jobs ). append( degrees ). append( learnmore). append( button ).foundation('open');
}





// AIzaSyC5BQTWAZOu6nYlZTV0fMI84ePDtBDqPyI
function createMap(){
    // location of sam glenn complex
    // 46.410886, -117.027695
    var mapCenter = {lat:46.410886, lng: -117.027695};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: mapCenter,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: mapCenter,
        map: map ,
        title: 'Sam Glenn Complex'
        
    });
    var info = '<h5>Career Showcase at LCSC</h5>' + 
               '<p>March 22, 2017 in the Sam Glenn Complex Lobby</p>'
    ;
    var infowindow = new google.maps.InfoWindow({
        content: info
    })
    marker.addListener('click', function(){
        infowindow.open( map, marker );
    })
    

    
}
console.log("Looking at the console, are you? :)")
console.log("Sounds like you have a nack for looking at code!")
console.log("Consider enrolling in the Web Design and Development program. We'll show you how to do what you're already doing, and make money doing it!")