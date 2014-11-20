$(init);

function init(){
 	setBoxPostion("leftSide",100,50);
	setBoxPostion("rightSide",400,50);
	setDragebale();
}

function setBoxPostion(className, posLeft, posTop){
	var leftPos = posLeft;
	var topPos = posTop;
	var totalObj = $("."+className).length;
	for(var i=0; i<totalObj;i++){
		var curItem = $("."+className+":eq("+i+")");
			curItem.css({"left":leftPos+"px","top":topPos+"px"});
			curItem.attr("dtat-org-Left",leftPos);
			curItem.attr("dtat-org-Top",topPos);
			topPos +=100;		
	}		
}

function setDragebale(){
	var dragElements = document.querySelectorAll('.draggable');
	  for (var i=0; i < dragElements.length; i++) {
			var drag = dragElements[i];
			var draggie = new Draggabilly( drag, {
			  containment: '#main'
			});
			draggie.on('dragMove', onDragMove);
			draggie.on('dragEnd', onDragEnd);
			draggie.enable();
	  }	 
}

function onDragMove(instance, event, pointer){
	var curObj = $(event.target);	
	if(curObj.attr('data-curAns')){
		curObj.addClass("setDepth");
		
		if(curObj.hasClass("leftSide")){
			$(".leftSide").removeClass("dropZone").addClass('draggable');
			$(".rightSide").addClass("dropZone");
		}else{
			$(".leftSide").addClass("dropZone");
			$(".rightSide").removeClass("dropZone").addClass('draggable');
		}
	}
}

function onDragEnd(instance, event, pointer){
	var curObj = $(event.target);	
	if(curObj.attr('data-curAns')){
		var setOrgLeft = curObj.attr("dtat-org-Left")+"px";
		var setOrgTop = curObj.attr("dtat-org-Top")+"px";	
		overObj = checkOverlapping(curObj);
		if(overObj.overLap){
			var curObjAns = curObj.attr("data-curAns");	
			var overObjAns = $(overObj.objOverlap).attr("data-curAns");	
			if(curObjAns==overObjAns){
				setOrgLeft = $(overObj.objOverlap).css("left");
				setOrgTop = $(overObj.objOverlap).css("top");
				curObj.css("display","none");	
				$(overObj.objOverlap).css("display","none");					
			}
		}else{		
			curObj.removeClass("setDepth");
		}		
		curObj.css({"left":setOrgLeft,"top":setOrgTop});
	}
}

function checkOverlapping(a){
	var compares = $(".dropZone");
        var l = a.size();
        var m = compares.size();
        for(var i = 0; i < l; i++){
           var bounds = a.get(i).getBoundingClientRect();
            for(var j = 0; j < m; j++){
               var compare = compares.get(j).getBoundingClientRect();
               if(!(bounds.right < compare.left ||
                    bounds.left > compare.right ||
                    bounds.bottom < compare.top ||
                    bounds.top > compare.bottom)){
					var overObj = overLapObjectName(compare.top);
					var curDataObj ={
						overLap:true,
						objOverlap:overObj	
					}
					return curDataObj;   
                }
            }
        }
		return false;	
}

function overLapObjectName(val){
	var matchId ;
	$(".dropZone").each(function(i, el) {
	  var pos = el.getBoundingClientRect();
	 	  pos.top;
		  if(val == pos.top){	
		     matchId= $(el); 				
		  }
	})
	return matchId;
}
	
	
