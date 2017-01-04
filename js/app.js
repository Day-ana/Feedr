// GA SF JS05
// Dayana
/* Please add all Javascript code to this file. */
$(document).ready(function() {

  $('.feed').on('click', function(el){
      $('#main').html(" ");
      fetchData(el.currentTarget.id);
  })

    function fetchData(id){
        //Dynamic Source
        var resourceUrl = "https://www.reddit.com/r/"+id+"porn/top.json";
        
        $('.spinner').show();
          setTimeout(function () {
                 $.ajax({
                  url: resourceUrl,
                  dataType: "jsonp",
                  jsonp:    "jsonp",  // the name of the URL parameter for jQuery to give the
                                      // callback function's name in    
                  success: function(data) {
                      renderArticle(data);
                        $('.spinner').hide();
                  },
                  error: function(error){
                    console.log(error);
                    alert('Can\'t connect');
                  }
                });
          }, 10);
    }

    function Reddit(el){
      this.title = el.title;
      this.thumb = el.thumbnail;
      this.impressions = el.ups;
      this.url = el.url;
      this.id = el.id;
      this.sub = el.subreddit;
      this.domain = el.domain;
    }

    function renderArticle(data){
        data.data.children.forEach(function(i){
          var dom = '<article class="article" id="'+i.data.id+'">';
          $('#main').append(dom);
          
          //Lets call our Reddit contructor function
          var article = new Reddit(i.data)
          renderContent(article);
        });
    }
    function renderContent(data){
      
      //Building Content for articles
      var thumb = $('<section class="featuredImage"><img src="'+data.thumb+'" alt="" /></section>');
      var title = $('<section class="articleContent"><a href="#"><h3>'+data.title+'</h3></a><h6>'+data.sub+'</h6></section>')
      var section = $('<section class="impressions">'+data.impressions+'</section> <div class="clearfix"></div>')
      
      //Parsing article with unique ID
      var rowArticle = $('#'+data.id+'');

      //Lets append them to the DOM
      rowArticle.append(thumb, title, section);
      $('#popUp').addClass('hidden');

      //Popup functionality
      $(rowArticle).on('click', function (el) {
        $('#popUp').removeClass('hidden loader');
        $('#popUp .container').css('display', 'block')
        $('#popUp .container h1').html(data.title)
        $('#popUp .container a').html('See more from '+data.domain)
        $('#popUp .container a').attr('href', data.url)
      })
    }

    //Close PopUp
    $('.closePopUp').on('click', function(){
       $('#popUp').addClass('hidden loader');
    });

    //Close PopUp if read more is clicked
    $('.popUpAction').on('click', function(){
      $('.closePopUp').click();
    });

    //Close PopUp on Esc
    $(document).keydown(function(e){
       var code = e.keyCode || e.which;
       if(code == 27){
          $('.closePopUp').click();
      }
    });

    //Toggle Search
    $('.toggle-search').on('click', function(){
        $('#search').toggleClass('active');
    });

    $('#search input').keyup(function() {
      var txt = $('input').val();
      console.log(txt);
        $('.article').each(function(el){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
             $(this).show();
           }else{
            $(this).hide();
           }
        });
    });

    //Refresh Page
    $('#home').on('click', function(){
        location.reload();
    });

    //Render All Sources
    $('.feed').click();

});
