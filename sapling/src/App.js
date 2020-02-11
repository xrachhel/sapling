import React from 'react';
import {Container} from "react-bootstrap"
import {Bar,Line,Pie} from "react-chartjs-2";



function App() {
  
  return (
    <div>
    <Container>
            <Line
                  data={{
                    // This label will carrie teh price of Amazon by determining days as labels, data as price and the background color will represent that store
                    labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
                    datasets:[{
                      label:"Amazon",
                      fill:false,
                      data:[
                        "$"+110.00,
                        14.00,
                        20.00,
                        540.00,
                        100.00,
                        20.00,
                        40.00
                      ],
                      borderColor:[
                        "rgb(255, 153, 0)"
                      ]
                    },{
                  
                    label:"Wallmart",
                    fill:false,
                    data:[
                      10.00,
                      1.00,
                      20.00,
                      500.00,
                      100.00,
                      200.00,
                      400.00
                    ],
                    borderColor:[
                      "rgb(0, 125, 198)"

                    ]
                  },
                  {
                  
                    label:"Best Buy",
                    fill:false,
                    data:[
                      10.00,
                      1.00,
                      20.00,
                      500.00,
                      100.00,
                      200.00,
                      400.00
                    ],
                    borderColor:[
                      "rgb(0, 59, 100)"

                    ],
                  }
                  ]
                  }}
                  width={10000}
                  height={10000}
                  options={{ 
                    title:{
                      display:true,
                      text:"Your item History"
                    }
                  }}
                  />

        </Container>

    </div>    
  );
}

export default App;
