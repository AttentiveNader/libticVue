<template> 
 <!-- this is the code for an undefeatable tictactoe game can be found on https://naderjs.lib.id/ticvue@dev/ -->
  <div id="app">  <!-- the full code for this  is on github  https://github.com/NaderJS/libticvue --> 
  <el-row type='flex' class="row-bg" justify="center">
   <div id="grid">   
   <div id='grid1' >  <!-- here is just using V-for looping through the objects at line 84 while adding event listeners -->
   <div v-for="box in objects" class="box" @click="add(box.index);AImove()">  
   <h1 class="botex">{{box.sign}}</h1> <!-- that sign in the h1 tag its at line 87 -->
   </div> <!-- this loop is for making a reactive 3x3 grid -->
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
</el-row> <!-- this is my email  if you want me to explain this algorithm instead of reading the comments nader_atef80@outlook.com -->

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
      objects:[  //these value properties which would look like it doesn't make any sense this is the way of making the AI understand how the game works
        { // if you put every value in a box of the 3x3 grid one by one with this same sort of the array from the left to the right u will see that every 3 digits on the same line (like the way how someone wins in the tictactoe) 
          value: 8, //u will see that some of these 3 digits equals 15 and thats how the concept of the game works 
          //if it is still unclear this is my email nader_atef80@outlook.com email me  and I will send u an image which will make it easier
          sign:'', //sign properties are just for which sign it is X or O in the box object

        },{ //please take a look at line 572 then come back to here
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
      icon:'', //that is the sign or the icon of the  player and the AI
      AIicon:'',
      userVal:[], //userVal and AIval these are the array of values which are assigned to the boxes in the array objects   
      AIval:[],//which means that when a box is chosen the value of this box gets added to one of the two arrays 
      qArr: [6,8,0,2], //these are just special arrays of some specific indexes of the objects array
      cArr:[7,5,3,1],
      count:[], //this array 'count' it contain the available moves to the AI the moves are objects with properties  
      breaker: undefined,
      play: false //just to allow the AI and the player to play or not
    }
  },
  methods:{
    clear:function(){
      //this is the restart function which returns everything to the begining
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
      let self = this  //this is the function which makes the move of the player and the AI the side argu is for specifying which one is playing AI or the player
      console.log(index)
      if(cond){
          self.objects[index].sign = self.AIicon
       self.AIval.push(self.objects[index].value) 
       self.play = false
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
      let self = this  //this is  the function which assign which one is X and which one is O
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
      self.count = []  // function which takes maybe more the 300 lines is the function which specifies which move should the AI do or how the AI plays 
      self.cArr = [7,5,3,1]
      if(self.play){
      console.log('start')
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
           console.log('the code got to here')    //here this is me tracing my code and which condition happened I use these console logs alot its very helpful finding anybug
           if(self.objects[self.qArr[r]].taken == true){
             if(r<self.qArr.length -1){
               self.add(self.qArr[r+1],self.AIval)
             }else{
               self.add(self.qArr[r-1],self.AIval)
             }
           }else{
             console.log('it seems to be here')
             self.add(self.qArr[r],self.AIval)
           }
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
          console.log(self.userVal[0],self.objects[self.cArr[0]].value)
          for(let n in self.userVal){
          for(let tr in self.qArr){

          if(self.userVal[n] == self.objects[self.qArr[tr]].value){
            self.hrArr.push(self.userVal[0])
            self.ident = true
          }
           
          
        }
          }
        if(self.hrArr.length == 2 ){
          self.count.push({
            index:self.cArr[self.ranNo(0,3)],
            res: 3,
            hint: 'from hrArr'
          })
        }
        console.log(self.hrArr,'hrArr here')
        }
        
      for(let key in self.objects){
        if(self.objects[key].taken == true){
        }else{
       
        //var id = self.userVal.reduce((a,b)=> a+b )
     // console.log(id,self.userVal)
      self.go = []
     for(let i in self.userVal){
       self.go.push(self.userVal[i])
     }
     self.go.push(self.objects[key].value)
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
        
      //  if(!self.breaker){
 self.count.push({
   index:key,
   res:5,
   hint: 'from normal def'
 })
//} 
break
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
             
           
       
             
             self.breaker = true
           //   break
              
              }else{
              
              }
              self.go.pop()
                 }
               }
               }
          
          
           
 AIarr.pop()         
         self.go.pop()
      // self.userVal.pop()
        } 
       }
         //   console.log(self.idArr,'idArr here yoooo')
             var ar = []
              self.undo = true
        for(let ele in self.idArr){
         for(let j in self.idArr[ele]){
           if(j>=2 && self.undo){
            self.recArr=[]
           for(let hi in self.idArr){
             for(let ru in self.idArr[hi]){
               if(ru>=2){
                 if(self.idArr[ele][j] == self.idArr[hi][ru]){
                   self.recArr.push(self.idArr[ele][j])
                 }
                 if(self.recArr.length >= 3 && self.recArr[0] !== "1" &&  self.recArr[0] !== "7"){
                   console.log(self.recArr,'recArr is here looooooooooook')
                   self.count.push({
                     index:self.idArr[ele][j],
                     res:1
                   })
                  self.undo = false
                  break
                  }
               }
             }
           }
          }
         }
         for(let el in self.idArr){
           if(self.idArr[el][3] == self.idArr[ele][3] && el !== ele){
       /*      self.runer = 0                                         
              for(let u in ar){
                 if(self.idArr[ele][2] !== ar[u]){
                   self.runer++
                 }  //here I was just trying something out and it didn't work
             }
             if(self.runer == ar.length  ){
               if(self.idArr[ele][2] !== "7"){
               ar.push(self.idArr[ele][2])
               }
             }
             self.runer = 0
              for(let u in ar){
                 if(self.idArr[el][2] !== ar[u]){
                   self.runer++
                 }
             }
                if(self.runer == ar.length && self.idArr[el][2] !== "7"){
               ar.push(self.idArr[el][2])
               
             }*/
           ar.push(self.idArr[el][2])
         
         //  ar.push(self.idArr[el][3])
           }
         }
        // console.log(ar)
       
         if(ar.length >= 2){
           console.log('about to work',ar,self.ident)
           if(ar[0] == 3  && self.ident){
             console.log('ident = true',ar)
 self.count.push({
             index: ar[1],
             res: -1
           })
           }else{
           self.count.push({
             index: ar[ar.length -1],
             res: -1,
             hint:'from deep def'
           })
           }
         
         }
        }
    
       if(self.count.length < 1){
          self.idan = []
          let paArr= []
          console.log('count is 0')
          for(let ar in self.objects){
            if(self.objects[ar].taken == true){}
            else{
              paArr.push(self.objects[ar])
            }
          }
          self.idArr =[]
          for(let r in paArr){
            self.userVal.push(paArr[r].value)
            self.ne = []
            for(let ikey in self.userVal){
              self.ne.push(self.userVal[ikey])
            }
                  for(let an in self.objects){
               if(an  !== r){
                 if(self.objects[an].taken == true){
                 }else{
                   let ad // = self.tripFunc(AIarr)
                   let id   //self.tripFunc(self.userVal)
               self.go.push(self.objects[an].value)
              let id1 = self.tripFunc(self.go,r,an)
         if(id1[0]){
            self.idArr.push(id1)
                console.log(id1,'id1 it got tooo here sec time',r,an )
              
           
       
            // self.go.pop()
             
           //   break
              
              }
              self.go.pop()
                 }
               }
               }
               self.userVal.pop()
          }
           var ar = []
        for(let ele in self.idArr){
       
         for(let el in self.idArr){
           if(self.idArr[el][3] == self.idArr[ele][3] && el !== ele){
               ar.push(self.idArr[ele][3])
         
         
         //  ar.push(self.idArr[el][3])
           }
         }
        // console.log(ar)
       
         if(ar.length >= 1){
           console.log('about to work sec time',ar,self.ident)
  
           self.count.push({
             index: ar[ar.length -1],
             res: -1
           })
           
          
         }
        }
      for(let u in self.objects){
           if(self.objects[u].taken == true){}
           else{
            self.idan.push(self.objects[u])
           self.userVal.push(self.objects[u].value)
           let intr  = self.tripFunc(self.userVal)
           if(intr[0]){
            
             break
           }
           self.userVal.pop()
         }
         }
        
         if(self.count.length < 1){
           self.count.push({
             index: self.idan[self.ranNo(0,self.idan.length -1)].index,
             res: -2
           })
         } 
       }
          self.count.sort(function(a,b){
        return a.res - b.res
       })
     console.log(self.count,"yooooooooooooo count here")
       if(self.count[self.count.length -1].res == 10){
              self.add(self.count[self.count.length -1].index,self.AIval,true)
       }else{
      self.add(self.count[self.count.length -1].index,self.AIval,false)
      }
      }
       
      }
      console.log(self.AIval,self.userVal)
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
         //    console.log(defArr,'defArr here')
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
  mounted:function(){ //this mounted function is just box I forgot to add 2 properties to the whole objects array 
    let self = this //this function gets fired just after the component gets mounted to the element  or just as the page load if you are not familiar with Vuejs life cycle hooks
    self.arr = []
    for(var key in self.objects){
      self.objects[key].index = key
      self.objects[key].taken = undefined
      self.arr.push(self.objects[key])
    }
  //  console.log(self.objects,self.arr)
    

  }
}
</script>
