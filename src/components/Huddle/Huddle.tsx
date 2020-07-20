import React, { useState } from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useHuddleParticipants from '../../hooks/useHuddleParticipants/useHuddleParticipants';


// Takes size of this participant strip, returns next square root
function nextSquareRoot(num: number) {
    if (Math.floor(Math.sqrt(num)) === Math.sqrt(num)) {
      return Math.floor(Math.sqrt(num));
    } else {
      return Math.floor(Math.sqrt(num)) + 1;
    }
  }
  
  // // Takes size of this participant strip, returns array of how many circles are in each row.
  // // arrangement[0] has the number of circles in the first ( 0th ) row
  
  function getArrangementNumbers(size: number) {
    let num = size;
    let nsr = nextSquareRoot(num);
    let arrangement = [];
    while (num != 0) {
      let row = Math.min(nsr, num);
      num -= row;
      arrangement.push(row);
    }
    return arrangement;
  }
  
  function getArangementPositions(size: number, diameter: number, center: any) {
    let index = 0;
    let arrangement = getArrangementNumbers(size);
    let sizeY = -(size * diameter) / 2;
    let result: any[] = [];
    for (let row = 0; row < size; row += 1) {
      // if last row is odd
      if (row > 0 && arrangement[row] % 2 !== arrangement[row - 1] % 2) {
        // hypotnuse n math shit
        sizeY -= ((2 - Math.sqrt(3)) * diameter) / 2;
      }
  
      let sizeX = -(arrangement[row] * diameter) / 2;
      for (let i = 0; i < arrangement[row]; i += 1) {
        result.push({ left: sizeX + center.left, top: sizeY + center.top });
  
        // radius math here
        sizeX += diameter;
        index += 1;
      }
  
      // next level
      sizeY += diameter;
    }
  
    return result;
  }