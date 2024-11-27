<@()=>{ 
    var nxtrc=db.qry([#pre#]);
    var rciterate = {};
    var cols=[[#cols#]];
    rciterate["cols"]=(nxtrc===undefined||nxtrc===null)?[]:(cols.length>0)?nxtrc.columns(cols):nxtrc.columns();
    cols=rciterate["cols"];
    rciterate["close"]=()=>{
        if(nxtrc!==undefined&&nxtrc!==null){
            nxtrc.close();
            nxtrc=null;
        }
    }
    rciterate["data"]=()=>{
        if(nxtrc!==undefined&&nxtrc!==null){
            return nxtrc.data(cols);
        }
        return [];
    }
    // Make it Iterable
    rciterate[Symbol.iterator] = function() {
        return {
            next() {
                if (nxtrc===undefined||nxtrc===null) {
                    return {value:null, done:true};
                }
                if (nxtrc.next()) {
                    rciterate["data"]=nxtrc.data(cols);
                    rciterate["rowNr"]=nxtrc.rowNr;
                    rciterate["first"]=nxtrc.isFirst();
                    rciterate["last"]=nxtrc.isLast();
                    return {value:rciterate, done:false};
                }
                nxtrc.close();
                nxtrc=null;
                return {value:null, done:true};
            }
        };
    }
    return rciterate;
}@>