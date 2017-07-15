<template>
  <div id="app">
  <el-row type='flex' class="row-bg" justify="center">
   <div id="grid">
   <div id='grid1' >
   <div v-for="box in objects" class="box" @click="add(box.index);AImove()">
   <h1 class="botex">{{box.sign}}</h1>
   </div>
   </div>
   <el-button type="warning" @click="clear" class="res" >Restart</el-button>
   <el-button type='danger' @click='AImove()' class="ai">AI start</el-button>
   <div >
   <div class="he">
   <div class="a" id="un" @click="setIcons('O')"><h2>O</h2></div>
   <div class="a" @click="setIcons('X')"><h2>X</h2></div>
   <h2>Choose X or O to try</h2>
   </div>
   </div>
</div>
</el-row>

  </div>
</template>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:10px;
}
.box{
  width :80px;
  box-sizing: border-box;
  border: 1px solid black;
  float:left;
  height: 70px;
  text-align:center;
  cursor:pointer
}

.res{
  margin-top: 15px;
  float:left
}
.ai{
  margin-top: 15px;
  float: right
}
.he{
  margin-top: 15px;
}
.a{
 max-width: 30px;
cursor: pointer;
margin: 0 auto;
display: block
}
.b{
 
}
#grid{
  max-width: 240px;
  margin: 0 auto;
  display:block;
  padding: 10px;
  box-shadow: 4px 4px 6px blue, -4px -4px 6px red
}
</style>


<script>


export default {
  name: 'app',
  components: {
  
  },
  data(){
    return {
      objects:[
        {
          value: 8,
          sign:'',

        },{
          value:1,
          sign:'',
        },{
          value:6,
          sign:'',
        },{
          value:3,
          sign:'',
        },{
          value:5,
          sign:'',
        },{
          value:7,
          sign:'',
        },{
          value:4,
          sign:'',
        },{
          value:9,
          sign:'',
        },{
          value:2,
          sign:'',
        }
      ],
      icon:'',
      AIicon:'',
      userVal:[],
      AIval:[],
      qArr: [6,8,0,2],
      cArr:[7,5,3,1],
      count:[],
      breaker: undefined,
      play: false
    }
  },
  methods:{
    filt: function(index){
      let self =  this
       if(self.objects[index].taken == true){}
       else{
         self.AImove()
       }
    },
    clear:function(){
      let self = this
      for(var key in self.objects){
        self.objects[key].sign = ''
        self.objects[key].taken = undefined
      }
      self.userVal = []
      self.AIval = []
      self.icon = ''
      self.AIicon = ''
      self.play = false
      
    },
    add:function(index,side,cond){
      let self = this 
      if(cond){
         self.objects[index].sign = self.AIicon
       self.AIval.push(self.objects[index].value) 
      }
     else if(self.play){
   // console.log(self.objects[index])
      if(self.objects[index].taken == true){
      }else if(side){
      self.objects[index].sign = self.AIicon
       self.AIval.push(self.objects[index].value) 
   //   console.log("side:",side)
      }else{
      self.objects[index].sign = self.icon
      self.userVal.push(self.objects[index].value)
      }
      self.objects[index].taken = true
    //console.log(self.objects[index])
      self.arr.splice(index,1)
      console.log(self.AIval,self.userVal)
      }
    },
    setIcons:function(text){
      let self = this 
      self.clear()
      self.play = true
      
      if(text == 'X'){
        self.icon = text
        self.AIicon = 'O'
      }else{
        self.AIicon = 'X'
        self.icon = 'O'
      }
    },
    AImove:function(){
      let self = this
      self.count = []
      self.cArr = [7,5,3,1]
      if(self.play){
     // console.log('start')
      self.huge = undefined
          self.idArr = []
      if(self.userVal.length <= 1){
        for(let jk in self.cArr){
          if(self.objects[self.cArr[jk]].taken == true){
           self.huge = true
           self.cArr.splice(jk,1)
          }
        }
        if(self.huge){
            self.add(4,self.AIval)
        }else if(self.objects[4].taken == true){
           let r =  self.ranNo(1,3)

           self.add(self.qArr[r],self.AIval)
        }else{
          let anArr = []
           for(let key in self.qArr){
             if(self.objects[self.qArr[key]].taken ==  true){
               break
               self.add(4,self.AIval)
             }else{

             anArr.push(1)
             }
           }
           if(anArr.length == self.qArr.length){
             let r =  self.ranNo(0,3)
           self.add(self.qArr[r],self.AIval)
           }else{
             self.add(4,self.AIval)
           }
        }

      }else{
        if(self.userVal.length == 2){
          self.hrArr = []
         // console.log(self.userVal[0],self.objects[self.cArr[0]].value)
          for(let n in self.userVal){
          for(let tr in self.qArr){

          if(self.userVal[n] == self.objects[self.qArr[tr]].value){
            self.hrArr.push(self.userVal[0])
            self.ident = true
          }
           
          
        }
          }
        if(self.hrArr.length == 2){
          self.count.push({
            index:self.cArr[self.ranNo(0,3)],
            res: 0
          })
        }
        console.log(self.hrArr,'hrArr here')
        }
        
      for(let key in self.objects){
        if(self.objects[key].taken == true){
        }else{
         self.userVal.push(self.objects[key].value)
        //var id = self.userVal.reduce((a,b)=> a+b )
     // console.log(id,self.userVal)
      self.go = []
     for(let i in self.userVal){
       self.go.push(self.userVal[i])
     }
     let AIarr = []
     for(let i in self.AIval){
       AIarr.push(self.AIval[i])
     }
     AIarr.push(self.objects[key].value)
     let ad = self.tripFunc(AIarr)
     let id = self.tripFunc(self.go)
    
  //   console.log('id',id)
   
    if(ad[0]){
let g = self.AIval

      let obj = {
        index: key,
        res: 10
      }

        console.log('ad heeeeeeeeeeey you here')
 //         if(!self.breaker){
  self.count.push(obj)
  
//}
       
     }
       if(id[0]){
         // console.log(id,'id')
          let g = self.AIval
      //  if(!self.breaker){
 self.count.push({
   index:key,
   res:0
 })
//}
  //      self.userVal.pop()
    //    self.go.pop()

         }
           //console.log('count:',self.count.length,id4)
         // console.log(self.run,self.count,'self.go')
               for(let an in self.objects){
               if(an  !== key){
                 if(self.objects[an].taken == true){
                 }else{
                   let ad // = self.tripFunc(AIarr)
                   let id   //self.tripFunc(self.userVal)
               self.go.push(self.objects[an].value)
              let id1 = self.tripFunc(self.go,key,an)
         if(id1[0]){
            self.idArr.push(id1)
                console.log(id1,'id1 it got tooo herer',key,an )
                let g = self.AIval
           
       
             self.go.pop()
             self.breaker = true
           //   break
              
              }else{
              
              }
              self.go.pop()
                 }
               }
               }
          
          
           
 AIarr.pop()         
         
       self.userVal.pop()
        } 
       }
          
            console.log(self.idArr,'idArr here yoooo')
        for(let ele in self.idArr){
        let ar = []
         for(let el in self.idArr){
           if(true){
             
           if(self.idArr[el][3] == self.idArr[ele][3]){
           ar.push(self.idArr[el][2])
           }
           }
         }
        // console.log(ar)
         if(ar.length >= 2){
           console.log('about to work',ar)
           if(ar[1] == 3 && self.ident){
 self.count.push({
             index: ar[0],
             res: -1
           })
           }else{
           self.count.push({
             index: ar[ar.length -1],
             res: -1
           })
           }
           break
         }
        }
    
       if(self.count.length < 1){
          self.idan = []
      for(let u in self.objects){
           if(self.objects[u].taken == true){}
           else{
            self.idan.push(self.objects[u])
           self.userVal.push(self.objects[u].value)
           let intr  = self.tripFunc(self.userVal)
           if(intr[0]){
             self.count.push({
               index: u,
               res: 0
             })
             break
           }
           self.userVal.pop()
         }
         }
        
         if(self.count.length < 1){
           self.count.push({
             index: self.idan[self.ranNo(0,self.idan.length -1)].index,
             res: -1
           })
         } 
       }
          self.count.sort(function(a,b){
        return a.res - b.res
       })
       console.log(self.count,"yooooooooooooo count here")
       if(self.count[self.count.length -1].res == 10){
        self.add(self.count[self.count.length -1].index,self.AIval,true)
        self.play = false
       }else{
      self.add(self.count[self.count.length -1].index,self.AIval,false)
       }
      }
       
      }
    },
    ranNo:function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
},
tripFunc:function(arr,key,an){
  let self =  this
  let defArr = []
  let reVal = false
  let breaker = true
  let reArr = []
  if(arr.length >= 3){
 // console.log(arr,'arr')
  }
  for(let r in arr){
    //console.log(reVal , 'reVall here')
    for(let g in arr){
      if(breaker){
          if(g!== r){
       for(let a in arr){
         if(breaker){
         if(a !== g && a !== r && g !== r ){
           defArr = []
           defArr.push(arr[r])
           defArr.push(arr[g])
           defArr.push(arr[a])
           let id  = defArr.reduce((a,b)=> a+b)
           
           if(id == 15){
             console.log(defArr,'defArr here')
             reVal = true
             reArr.push(reVal)
             reArr.push(defArr)
             if(key){
               reArr.push(key)
             }
             if(an){
               reArr.push(an)
             }
             breaker = false
             break
           }
         }
       }
       }
     }
    }
    }
    
  }
return reArr
}
  },
  mounted:function(){
    let self = this 
    self.arr = []
    for(var key in self.objects){
      self.objects[key].index = key
      self.objects[key].taken = undefined
      self.arr.push(self.objects[key])
    }
 //   console.log(self.objects,self.arr)
    

  }
}
</script>
