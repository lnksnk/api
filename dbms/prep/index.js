<@()=>{ 
    var rciterate = {};
    var nxtprep=db.prep([#pre#],{"exe":(prpexe,affected,insertid)=>{
        rciterate["affected"]=affected;
        rciterate["insertid"]=insertid;
    }});

    rciterate["exec"]=()=>{
        rciterate["affected"]=-1;
        rciterate["lastid"]=-1;
        if(nxtprep!==undefined&&nxtprep!==null){
            try{
                nxtprep.exec();
            } catch(e){
                nxtprep.close();
                nxtprep=null;
                return
            }
            nxtprep.close();
            nxtprep=null;
            return;
        }
    }
    
    rciterate["close"]=()=>{
        if(nxtprep!==undefined&&nxtprep!==null){
            nxtprep.close();
            nxtprep=null;
        }
    }
    // Make it Iterable
    rciterate[Symbol.iterator] = function() {
        return {
            next() {
                if (nxtprep===undefined||nxtprep===null) {
                    return {value:null, done:true};
                }
                try {
                    rciterate["affected"]=-1;
                    rciterate["lastid"]=-1;
                    nxtprep.exec();
                    return {value:rciterate, done:false};
                } catch(err){
                    nxtprep.close();
                    return {value:null, done:true};
                }
                nxtrc.close();
                nxtrc=null;
                return {value:null, done:true};
            }
        };
    }
    return rciterate;
}@>