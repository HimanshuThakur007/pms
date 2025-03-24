import React from "react";

const CountCard = ({data}:any) => {
    const cardData= [
        {icon:"ti-grip-vertical", heading:"Employee", count: data?.noofUser},
        {icon:"ti-grip-vertical", heading:"Location", count: data?.noofSite},
        {icon:"ti-grip-vertical", heading:"Task", count: data?.noofTask},
        {icon:"ti-grip-vertical", heading:"QC Task", count: data?.noofQCTask},
        {icon:"ti-grip-vertical", heading:"PM Task", count: data?.noofWOTask},
        {icon:"ti-grip-vertical", heading:"PM Completed Task", count: data?.noofPMCompleteTask},
        {icon:"ti-grip-vertical", heading:"Pending Task", count: data?.noofPenTask},
        {icon:"ti-grip-vertical", heading:"Completed Task", count: data?.noofCompTask},
    ]
  const randomBgColors = [
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
  ];
  const randomColor =
    randomBgColors[Math.floor(Math.random() * randomBgColors.length)];
  return (
    <>
    {cardData.map((item:any,index:number)=>(
        <div className="col-md-3 d-flex" key={index}>
        <div className="card flex-fill">
          <div className={`card-body`}>
            <div className="d-flex justify-content-between ">
              <h6>
                <i className={`ti ${item.icon} me-1`} />
                {item.heading}
              </h6>
              <p className="text-danger">{item.count}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
   </>
  );
};

export default CountCard;
