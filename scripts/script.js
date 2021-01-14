let TDJKey= "keywD8l2MAXUJgswX", CId='app7i1Y3Y5ELHzgPr';
var Airtable = require('airtable');
var base = new Airtable({ apiKey: TDJKey }).base(CId);

const app = new Vue({
  el: '#test',
  data: {
    Overview:"",
    tab1:"Armors",
    tab2:"",
    Armors: {
      list: false,
      type: false,
      Stype: false,
    },
    Mods: {
      principal: false,
      superior: false,
      back: false,
      utilitary: false,
      inferior: false,

    },
    Compressors: {
      list: false,
      Stype: false,
      Sclass: false,
    },
    Weapons: {
      list: false,
      Sclass: {
        N1: false,
        N2: false,
        N3: false,
        N4: false,
        N5: false,
      },
    },
    Ammos: {
      list: false,
      Stype: {
        N1: false,
        N2: false,
        N3: false,
        N4: false,
        N5: false,
        N6: false,
        N7: false,
        N8: false,
        N9: false,
      },
      Sclass: {
        N1: false,
        N2: false,
        N3: false,
        N4: false,
        N5: false,
        N6: false,
        N7: false,
        N8: false,
        N9: false,
      },
    },
    Equipments: {
      list: false,
      Stype: {
        N1: false,
        N2: false,
        N3: false,
        N4: false,
        N5: false,
        N6: false,
        N7: false,
        N8: false,
        N9: false,
      },
      Sclass: {
        N1: false,
        N2: false,
        N3: false,
        N4: false,
        N5: false,
        N6: false,
        N7: false,
        N8: false,
        N9: false,
      },
    },
    Set: {
      Armor: {
        Base: false,
        Mods: {
          Principal: false,
          Superior: [""],
          Back: [""],
          Utilitary: [""],
          Inferior: [""],
        }
      },
      Compressor: {
        Base: false,
        Weapons: {
          N1: false,
          N2: false,
          N3: false,
          N4: false,
          N5: false,
        },
        Ammos: {
          N1: false,
          N2: false,
          N3: false,
          N4: false,
          N5: false,
          N6: false,
          N7: false,
          N8: false,
          N9: false,
        },
        Equipments: {
          N1: false,
          N2: false,
          N3: false,
          N4: false,
          N5: false,
          N6: false,
          N7: false,
          N8: false,
          N9: false,
        },
      },
    },
  },
  methods: {
    load(table, filter, links) {
      let a=[], i=0;
      base(table).select({
        sort: [{field: 'Name', direction: 'asc'}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          if(!filter || record.fields[filter.key] == filter.value) {
            console.log('Retrieved ', record.get('Name'));
            if(!record.get('Name')) return;
            if(links){
              for (let i = 0; i < links.length; i++) {
                if(links[i].table.includes(table)) record.fields[links[i].key]= links[i].values.filter(val => val.id == record.fields[links[i].key][0])[0];
              }
            }
            a.push({id: record.id, data:record.fields});
          }
        });
        fetchNextPage();
      }, function done(error) {
        console.log(error);
      });
      
      return a;
    },
    find(table, filter){
      base(table).find(filter, function(err, record) {
        if (err) { console.error(err); return; }
        console.log('Retrieved', record.get("Name"));
        return record.data
      });
    },
    unique(arr, target){
      let a=[];
      for (let i = 0; i < arr.length; i++) {
        if(!a.includes(eval("arr[i]."+target))) a.push(eval('arr[i].'+target));
      }
      return a;
    },
    iffalse(a,b){
      if(!a || a.includes('NaN')) a = b;
      return a
    },
    ATS(a, b){
      let str = "";
      if(!a||!b) {
        str = "None";
      } else if(Array.isArray(a)){
        for (let i = 0; i < a.length; i++) {
          if(i>0) str += " + ";
          str += a[i]+" ";
          if(Array.isArray(b)) str += b[i];
          else str += b
        }
      } else if(Array.isArray(b)) {
        for (let i = 0; i < b.length; i++) {
          if(i>0) str += " + ";
          str += a + " " + b[i];
        }
      }
      return str;
    },
    NTA(n, d){
      let a=[];
      if(n) n = Number(n);
      else n = d;
      for (let i = 1; i <= n; i++) {
        a.push(i);
      }
      return a;
    },
    ifNone(a,b){
      if(!a || a == "None") return "None";
      else return b
    },
    NegPos(a,b){
      if(!b) b=100;
      a = (Math.round(a*b)/b)
      if(a > 0) a = "+"+a;
      return a;
    },
    condition(boolean){
      return boolean;
    },
    initialisation(){
      let Links = []; data = this;
      Links.push(
        {table: ["Armors"], key: "Feature", values : data.load("Special_Abilities")},
        {table: ["Armors"], key: "Type", values : data.load("Armor_Types")},
        {table: ["Armors"], key: "Generators_Type", values : data.load("Generator_Types")},
        {table: ["Mods"], key: "Type", values : data.load("Mod_Types")},
        {table: ["Compressors"], key: "Type", values : data.load("Compressor_Types")},
        {table: ["Compressors"], key: "Class", values : data.load("Compressor_Class")},
        {table: ["Weapons", "Ammos"], key: "Class", values : data.load("Weapon_Class")},
        {table: ["Weapons", "Ammos"], key: "Cartridge", values : data.load("Cartridges")},
        {table: ["Ammos"], key: "Type", values : data.load("Ammo_Types")},
        {table: ["Equipments"], key: "Type", values : data.load("Equipment_Types")},
        {table: ["Equipments"], key: "Class", values : data.load("Equipment_Class")}
        );
      setTimeout(function(){
        data.Armors.list = data.load("Armors", false, Links);
        data.Compressors.list = data.load("Compressors", false, Links);
        data.Mods.principal = data.load("Mods", {key: "Type",value: "rec5TQ0hkRPnH32XI"}, Links);
        data.Mods.superior = data.load("Mods", {key: "Type",value: "rec9UyvBPf22A1JjE"}, Links);
        data.Mods.back = data.load("Mods", {key: "Type",value: "recUSxINQMzhiC43E"}, Links);
        data.Mods.utilitary = data.load("Mods", {key: "Type",value: "recu8Jh1QXJsq2srM"}, Links);
        data.Mods.inferior = data.load("Mods", {key: "Type",value: "recusv04sHlBp16ZP"}, Links);
        data.Weapons.list = data.load("Weapons", false, Links);
        data.Ammos.list = data.load("Ammos", false, Links);
        data.Equipments.list = data.load("Equipments", false, Links);
      }, 1000);
    },
    alert(a){
      alert(a)
    },
  },
});