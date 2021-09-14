async function getcovidapiIn(){

    const jsondata = await fetch('https://data.covid19india.org/data.json');
    const jsdata = await jsondata.json();
    const vaccinedata = Object.keys(jsdata.tested).length;
    var vaccinedatafinal = jsdata.tested[vaccinedata-1];
    const onedaybeforevaccine = jsdata.tested[vaccinedata-2];

    const size = Object.keys(jsdata.cases_time_series).length;
    const yesterdayupdate = jsdata.cases_time_series[size-1];
    const finaldata = jsdata.statewise[0];
    let todayvac = parseInt(vaccinedatafinal.totaldosesadministered)
    let deltavac = parseInt(onedaybeforevaccine.totaldosesadministered);
    let deltavaccine = (todayvac-deltavac).toString();

    if(isNaN(deltavaccine))
    {
        deltavaccine='0';
    }
    let todaysvac = document.querySelector('#deltavac');
    todaysvac.innerText = `${deltavaccine.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

    if(deltavaccine=='0')
    {        
    let vaccinedose = document.querySelector('#vaccine-dose');
    vaccinedose.innerText = `${(jsdata.tested[vaccinedata-2].totaldosesadministered).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;
    }
    else{
        let vaccinedose = document.querySelector('#vaccine-dose');
        vaccinedose.innerText = `${(vaccinedatafinal.totaldosesadministered).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;
    }


    const lastupdate= document.querySelector('#date-time');
    lastupdate.innerText = `${finaldata.lastupdatedtime}`;

    var  date  =  new Date();
    var datetoday = date.getDate();
    var hour  = date.getHours();
    var min = date.getMinutes();
    var timenow= hour;
    var updatedtimenew = finaldata.lastupdatedtime.split(' ');
    var updatemin = updatedtimenew[1].split(':')
    var dateupdatedon = updatedtimenew[0].split('/');
    var updatehour = updatemin[0];
    if(datetoday==dateupdatedon[0])
    {
  
            var finaltimeupdate = parseInt(timenow)-parseInt(updatehour);
          
        
    }
    else {

        if(hour==0)
        {
            timenow=24;
        }
        var finaltimeupdate = parseInt(timenow)-parseInt(updatehour);
    
        if(finaltimeupdate<0)
        {
            finaltimeupdate = -(finaltimeupdate);
        }
    }

    if(finaltimeupdate==0)
    {
      
        var finaltimeupdatemin = min-updatemin[1];
        lastupdate.innerText = `Last updated ${finaltimeupdatemin} mins ago.`;
    }
    else{

        var finaltimeupdatemin = min-updatemin[1];
        if(finaltimeupdatemin<0){
            finaltimeupdatemin= -(finaltimeupdatemin);
        }
        if(finaltimeupdate==1){
            lastupdate.innerText = `Last updated ${finaltimeupdate} hr ago.`;
            
        }
        else{

            lastupdate.innerText = `Last updated ${finaltimeupdate} hrs ago.`;
         
        }
    }

}

getcovidapiIn();
