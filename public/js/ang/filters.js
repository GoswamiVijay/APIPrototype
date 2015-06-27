'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      console.log(input, start , " Start");
      return input.slice(start);
  }
})
.filter('htmlToPlaintext', function() {
  return function(htmlText) {
    return String(htmlText).replace(/<[^>]+>/gm, '');
  }
})
.filter('filterLabComment', function(){
  return function(labcomments, id){
    var comments = new Array();
    angular.forEach(labcomments, function(value){
      if(value.labbookid == id) comments.push(value);
    });
    return comments;
  }
})
.filter('filterstylist', function(){
  return function(stylist, services){
    var res = [];
    var selectedService = [];
    for(var j = 0; j < services.length ; j++){
      if(services[j].selected) selectedService.push(services[j]);
    }
    //console.log("stylist", stylist);
    if(selectedService.length > 0){
      for (var i= 0; i < stylist.length; i++) {
       var data = stylist[i];
       var isShowInList = false;
       if(data.service_type && data.service_type != null){
        // for (var x = 0; x < data.service_type.length; x++){
        //   var val=data.service_type[x];
        //   for (var y= 0; y < selectedService.length; y++){     
        //     // if((val.selected && selectedService[y].selected) && val.service == selectedService[y].service){             
        //     //  res.push(data);           
        //     // };

        //     console.log(val.service, selectedService[y].service);
        //     if((val.service == selectedService[y].service) && val.selected){
        //       isShowInList = true;
        //     }
        //   };
        //   // console.log(isShowInList);
        //   // if(!isShowInList) break;
        //   //if(i == stylist.length-1) {console.log('gd k ghk gh',res); return res;}  
        // };
        // if(isShowInList){
        //   res.push(data);
        // }

         var isAllServiceSelectedByStylist = false;

         for(var j = 0; j < selectedService.length; j++){
            var isService = false;
            var ser = selectedService[j];
            for(var n = 0; n < data.service_type.length; n++){
              if(data.service_type[n].service == ser.service && data.service_type[n].selected){
                isService = true;
              }
            }
            //if(!isService) break;
            if(isService && j == 0){
              res.push(data);
            } else if(!isService) {
              for(var m = 0; m < res.length; m++){
                if(res[m]._id == data._id){
                  res.splice(m,1);
                }
              }
            }
         }
       }
      }
    } 
    return res;
  }
})
.filter('taskFilter',function(){
  return function(tasks, id){
    if(tasks){
      var filteredTasks = new Array();
      angular.forEach(tasks, function(value){
        if(value.projectid == id) filteredTasks.push(value);
      });
      return filteredTasks;
    }
  }
})
.filter('displayfavoritesProject',function(){
  return function(projects, isFav){
    if(projects){
      if(isFav){
        var filteredProject = new Array();
        angular.forEach(projects, function(value){
          if(value.isFavourites) filteredProject.push(value);
        });
        return filteredProject;
      } else {
        return projects;
      }
    }
  }
})
.filter('highlight', function () {
  return function (text, search, caseSensitive) {
    if ((search || angular.isNumber(search)) && text != null) {
      text = text.toString();
      search = search.toString();
      if (caseSensitive) {
        return text.split(search).join('<span class="ui-match">' + search + '</span>');
      } else {
        return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
      }
    } else if(text == null){
      return '';
    } else {
      return text;
    }
  };
})
.filter('filterLabitems', function(){
  return function(items,isDisplayStarredLab, isDisplayDraftLab, isDisplayArchivedLab){
    var labItems = new Array();
    angular.forEach(items, function(value){
      if(isDisplayStarredLab && isDisplayDraftLab && isDisplayArchivedLab){
        if(value.isStared && value.isDraft && value.isArchived)
          labItems.push(value);
      } else if(isDisplayStarredLab && isDisplayDraftLab){
        if(value.isStared && value.isDraft)
          labItems.push(value)
      } else if(isDisplayStarredLab && isDisplayArchivedLab){
        if(value.isStared && value.isArchived)
          labItems.push(value);
      } else if(isDisplayDraftLab && isDisplayArchivedLab){
        if(value.isDraft && value.isArchived)
          labItems.push(value);
      } else if(isDisplayStarredLab){
        if(value.isStared)
          labItems.push(value);
      } else if(isDisplayDraftLab){
        if(value.isDraft)
          labItems.push(value);
      } else if(isDisplayArchivedLab){
        if(value.isArchived)
          labItems.push(value);
      } else {
        if(!value.isDraft && !value.isArchived)
          labItems.push(value);
      }
    });
    return labItems;
  }
})
.filter('directoryFilter', function(){
  return function(list, alpha){
    if(alpha && alpha != ''){
      var filteredResult = new Array();
      angular.forEach(list, function(value){
        if(value.user.firstname && value.user.firstname.toLowerCase().indexOf(alpha) == 0){
            filteredResult.push(value);
        } else if(value.user.companyname && value.user.companyname.toLowerCase().indexOf(alpha) == 0){
          filteredResult.push(value);
        }
      });
      return filteredResult;
    } else {
      return list;
    }
  }
})
.filter('filesFilter', function(){
  
  return function(filename){
    var filesType = ['.jpg',  '.jpeg','.gif', '.xls', '.xlsx', '.doc', '.ppt', '.pdf', '.txt', '.mp3', '.mp4', '.html', '.htm'];
    var filesClass = [
      ' fa-file-image-o',
      ' fa-file-image-o',
      ' fa-file-image-o',
      ' fa-file-excel-o',
      ' fa-file-excel-o',
      ' fa-file-word-o',
      ' fa-file-powerpoint-o',
      ' fa-file-pdf-o',
      ' fa-file-text',
      ' fa-file-sound-o',
      ' fa-file-video-o',
      ' fa-html5',
      ' fa-html5'
      ];
    var isFound = false;
    var foundIndex;
    angular.forEach(filesType, function(value, index){
      if(filename.toLowerCase().indexOf(value) >= 0){
        foundIndex = index;
        isFound = true;
      }
    });
    if(isFound){
      return filesClass[foundIndex];
    } else {
      return 'fa-file-o';
    }
  }
});