class DBMS {
    constructor(alias){
        this.alias=alias
    }

    qry(defaults) {
        if (defaults===undefined||defaults==null) {
            defaults={};
        }
        var stmnt="";
        if (defaults["stmnt"]!==undefined&&defaults["stmnt"]!==null){
            stmnt=defaults["stmnt"];
            delete defaults.stmnt;
        }
        var cols=[];
        if (defaults["cols"]!==undefined&&defaults["cols"]!==null){
            cols=defaults["cols"];
            delete defaults.cols;
        }
        var nxtrc=db.qry(this.alias,stmnt);
        var rciterate = {};
        rciterate["cols"]=(nxtrc===undefined||nxtrc===null)?[]:(cols.length>0)?nxtrc.columns(cols):nxtrc.columns();
        rciterate["close"]=()=>{
            if(nxtrc!==undefined&&nxtrc!==null){
                nxtrc.close();
                nxtrc=null;
            }
        }
        rciterate["first"]=()=>{
            if(nxtrc!==undefined&&nxtrc!==null){
                return nxtrc.isFirst()
            }
            return false;
        }
        rciterate["last"]=()=>{
            if(nxtrc!==undefined&&nxtrc!==null){
                return nxtrc.isLast()
            }
            return false;
        }
        rciterate["rowNr"]=()=>{
            if(nxtrc!==undefined&&nxtrc!==null){
                return nxtrc.rowNr;
            }
            return 0;
        }
        // Make it Iterable
        rciterate[Symbol.iterator] = function() {
            return {
                next() {
                    if (nxtrc===undefined||nxtrc===null) {
                        return {value:null, done:true};
                    }
                    if (nxtrc.next()) {
                        return {value:[nxtrc.data(),rciterate.rowNr(),rciterate.first(),rciterate.last()], done:false};
                    }
                    nxtrc.close();
                    nxtrc=null;
                    return {value:null, done:true};
                }
            };
        }
        return rciterate;
    }
}

export {DBMS}