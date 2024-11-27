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
        return (@><qry: [$this.alias,stmnt,defaults$] cols=[$cols$]/><@)();
    }

    exec(defaults) {
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
        return (@><exec: [$this.alias,stmnt,defaults$]/><@)();
    }
    
    prep(defaults) {
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
        return (@><prep: [$this.alias,stmnt,defaults$]/><@)();
    }
}

export {DBMS}