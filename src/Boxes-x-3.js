import React, { Component } from 'react'

export default class Boxes extends Component {
    someData = {
        row1: {
            left: [
            {space:0,
            available: true,
            number:''},
            {space:1,
            available: true,
            number:''},
            {space:2,
            available: true,
            number:''}],
            middle: [
            {space:3,
            available: true,
            number:''},
            {space:4,
            available: true,
            number:''},
            {space:5,
            available: true,
            number:''}],
            right: [
            {space:6,
            available: true,
            number:''},
            {space:7,
            available: true,
            number:''},
            {space:8,
            available: true,
            number:''}]
            },
        row2: {
            left: [
            {space:0,
            available: true,
            number:''},
            {space:1,
            available: true,
            number:''},
            {space:2,
            available: true,
            number:''}],
            middle: [
            {space:3,
            available: true,
            number:''},
            {space:4,
            available: true,
            number:''},
            {space:5,
            available: true,
            number:''}],
            right: [
            {space:6,
            available: true,
            number:''},
            {space:7,
            available: true,
            number:''},
            {space:8,
            available: true,
            number:''}]
            },
        row3: {
            left: [
            {space:0,
            available: true,
            number:''},
            {space:1,
            available: true,
            number:''},
            {space:2,
            available: true,
            number:''}],
            middle: [
            {space:3,
            available: true,
            number:''},
            {space:4,
            available: true,
            number:''},
            {space:5,
            available: true,
            number:''}],
            right: [
            {space:6,
            available: true,
            number:''},
            {space:7,
            available: true,
            number:''},
            {space:8,
            available: true,
            number:''}]
            },
            columnsRemaining:
            [{
              id: 1,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
             {
              id: 2,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 3,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 4,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 5,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 6,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 7,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 8,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            },
            {
              id: 9,
              left: [0,1,2],
              middle: [3,4,5],
              right: [6,7,8]
            }]
        // numbers: [1,2,3,4,5,6,7,8,9]        
    };

    makeBoxes= () => {
        const numbers=  [1]//[1,2,3,4,5,6,7,8,9];
        let row1 = []
        numbers.forEach(num => {
            //which boxes are remaining for this number in these 3 boxes
            let availableBoxes = ['left', 'middle', 'right'];
            //for each box
            for(let i = 1; i <= 3; i++ ){
                //pick a unique random box each time
                let randomBox = Math.floor(Math.random() * availableBoxes.length);
                let chosenBox = availableBoxes[randomBox];
                //check which spaces in this iteration are available in this box
                const rowSpaces = this.someData.row1[chosenBox]
                    .filter(item => item.available)
                    .map(item => item.space);

                //update the boxes available for the next iteration
                availableBoxes = availableBoxes.filter(box => box !== chosenBox);

                //get the current number object from columnsRemaining
                let columnSpaces = this.someData.columnsRemaining.find(({ id }) => id === num);

                // find the actual available spaces by cross referencing which column spaces are left with which row spaces are left
                const actualAvailable = columnSpaces[chosenBox].filter(spaces => rowSpaces.includes(spaces));

                // pick a random space from the ones actually available
                const randomSpace = Math.floor(Math.random() * actualAvailable.length);
                const chosenSpace = actualAvailable[randomSpace];
                
                console.log("chosenBox= ", chosenBox)
                console.log("chosenSpace= ",chosenSpace);
                
                //make a string for the current row to use to update object
                const currentRow =  `row${i}`
                
                //find space chosen in row
                
                const rowSpaceToUpdate = this.someData[currentRow][chosenBox].find(item => item.space === chosenSpace);

                console.log(rowSpaceToUpdate);
                console.log(row1);
                //update 
                // this.someData[currentRow][chosenBox][chosenSpace].available = false;
               
                
            }

        })
}
    componentDidMount() {
        this.makeBoxes();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
