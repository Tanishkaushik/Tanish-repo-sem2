function calculateResult(){
    let n = document.getElementById("subjects").value;
    let total=0,grade;
    for(let i=0;i<n;i++)
    {
        let x= parseFloat(prompt("ENter the marks of subject "+(i+1)));
        total += x;
    }
    let average=total/n;
    if(average>=90)
    {
        grade='A+';
    }
    else if(average>=85 && average<90)
    {
        grade='A';
    }
    else if(grade>=80 && grade<85)
    {
        grade='B';
    }
    else if(grade>=75 && grade<80)
    {
        grade='C';
    }
    else if(grade>40 && grade<75)
    {
        grade='D';
    }
    else{
        grade='Fail'
    }
    let result=document.getElementById("result").innerHTML="Total Marks: "+ total 
    + "<br>"+ "Average Marks: "+ average + "<br>" +"Grade: "+ grade;
}