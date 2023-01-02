import {defineStore} from "pinia";
export const useTaskStore = defineStore('taskStore',{
    state:()=>(
        {
            tasks: [],
            name:"Ahmed Gharmoul",
            isLoading : false
   }
    ),
    getters:{
        favorite(){
            return this.tasks.filter((t)=> t.isFav)
        },
        favCount(){
            return this.tasks.reduce((prev,curr)=>{
                return curr.isFav ? prev + 1 : prev
            },0)
        },
        totalCount : (state)=>{
            return state.tasks.length;
        }
    },
    actions:{
        async getTasks(){
            this.isLoading = true
          const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()


            this.isLoading= false
            this.tasks = data
        },
        async addTask(task){
            this.tasks.push(task)
            const response = await fetch("http://localhost:3000/tasks",{
                method: 'POST',
                body: JSON.stringify(task),
                headers:{'Content-type':'application/json'}
            })
            if(response.error){
                console.log(response.error)
            }
        },
        async deleteTask(id){
            this.tasks= this.tasks.filter((task)=>
            {
               return task.id !== id
            })
            const response = await fetch("http://localhost:3000/tasks/"+id,{
                method: 'DELETE',

            })
            if(response.error){
                console.log(response.error)
            }
        },
       async toggleFav(id){
            const task = this.tasks.find(task => task.id === id)
            task.isFav = ! task.isFav

           const response = await fetch("http://localhost:3000/tasks/"+id,{
               method: 'PATCH',
               body: JSON.stringify({isFav:task.isFav}),
               headers:{'Content-type':'application/json'}
           })
           if(response.error){
               console.log(response.error)
           }
        }
    }
})