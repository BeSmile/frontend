// @ts-nocheck
/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-06-09 17:52:12
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-10 16:22:32
 */
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

export default () => {
  const tetrisRef = useRef<HTMLCanvasElement>();
  useEffect(() => {
    const canvas = tetrisRef.current;
    const context = canvas.getContext('2d');
    context.scale(20, 20);
    // 根据宽高生成 12 * 20的数组
    let makeMatrix = function (w, h) {
      const matrix = [];
      while (h--) {
        matrix.push(new Array(w).fill(0));
      }
      return matrix;
    };
    // 生成不同的形状
    let makePiece = (type: string) => {
      if (type === 't') {
        return [
          [0, 0, 0],
          [5, 5, 5],
          [0, 5, 0],
        ];
      } else if (type === 'o') {
        return [
          [7, 7],
          [7, 7],
        ];
      } else if (type === 'l') {
        return [
          [0, 4, 0],
          [0, 4, 0],
          [0, 4, 4],
        ];
      } else if (type === 'j') {
        return [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
        ];
      } else if (type === 'i') {
        return [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
        ];
      } else if (type === 's') {
        return [
          [0, 3, 3],
          [3, 3, 0],
          [0, 0, 0],
        ];
      } else if (type === 'z') {
        return [
          [6, 6, 0],
          [0, 6, 6],
          [0, 0, 0],
        ];
      }
      return [];
    };

    let points = function () {
      let rowCount = 1;
      outer: for (let y = area.length - 1; y > 0; --y) {
        for (let x = 0; x < area[y].length; ++x) {
          if (area[y][x] === 0) {
            continue outer;
          }
        }
        const row = area.splice(y, 1)[0].fill(0);
        area.unshift(row);
        ++y;
        player.score += rowCount * 100;
        rowCount *= 2;
      }
    };

    // 判断是否超出编辑
    let collide = function (area, player) {
      const [m, o] = [player.matrix, player.pos];
      for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
          if (m[y][x] !== 0 && (area[y + o.y] && area[y + o.y][x + o.x]) !== 0) {
            return true;
          }
        }
      }
      return false;
    };

    let drawMatrix = function (matrix, offset) {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            // context.fillStyle=colors[value];
            // context.fillRect(x+offset.x,y+offset.y,1,1);
            let imgTag = new Image();
            imgTag.src = colors[value];
            context.drawImage(imgTag, x + offset.x, y + offset.y, 1, 1);
          }
        });
      });
    };
    let merge = function (area, player) {
      player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            area[y + player.pos.y][x + player.pos.x] = value;
          }
        });
      });
    };
    let rotate = function (matrix, dir) {
      for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
      }
      if (dir > 0) {
        matrix.forEach((row) => row.reverse());
      } else {
        matrix.reverse();
      }
    };
    let playerReset = function () {
      const pieces = 'ijlostz';
      // 优先生成一个俄罗斯块
      player.matrix = makePiece(pieces[Math.floor(Math.random() * pieces.length)]);
      player.pos.y = 0;
      player.pos.x = Math.floor(area[0].length / 2) - Math.floor(player.matrix[0].length / 2); // 生成下一个块出现的位置
      console.log(player, 'player');
      if (collide(area, player)) {
        area.forEach((row) => row.fill(0));
        player.score = 0;
        gameRun = false;
      }
    };
    let playerDrop = function () {
      player.pos.y++;
      // 处理边界
      if (collide(area, player)) {
        player.pos.y--;
        merge(area, player);
        points();
        playerReset();
        updateScore();
      }
    };
    let playerMove = function (dir) {
      player.pos.x += dir;
      if (collide(area, player)) {
        player.pos.x -= dir;
      }
    };
    let playerRotate = function (dir) {
      const pos = player.pos.x;
      let offset = 1;
      rotate(player.matrix, dir);
      while (collide(area, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
          rotate(player.matrix, -dir);
          player.pos.x = pos;
          return;
        }
      }
    };
    let draw = function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      updateScore();
      drawMatrix(area, { x: 0, y: 0 });
      drawMatrix(player.matrix, player.pos);
    };
    let dropInter = 100;
    let time = 0;
    let update = function () {
      time++;
      if (time >= dropInter) {
        playerDrop();
        time = 0;
      }
      draw();
    };
    // 更新积分
    let updateScore = function () {
      context.font = 'bold 1px Comic Sans MS';
      context.fillStyle = '#ffffff';
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.fillText('Score:' + player.score, 0.2, 0);
    };
    // 游戏结束
    let gameOver = function () {
      clearInterval(gameLoop);
      context.font = '2px Comic Sans MS';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Game Over', canvas.width / 20 / 2, canvas.width / 20 / 2);
      // document.getElementById("start_game").disabled=false;
    };
    // 定义每种俄罗斯块的颜色
    const colors = [
      null,
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Jz34T+Ifv3kGIOojBWYBgFkNlgADfTUeTEygjQLC3Iz3Li8G5sanGIauq5gPYwlTdvAtpMLwC6AORlkKjEA2bUYBvDxsYDN+PTpDwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Bb19cYRCW0EGNRrLCgBQXvH3/lQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQAfwJNr7nKi7AAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBgKD1y/D+Ifn7sCIOklQ2YBgFkNlgADSwpK2VkBGkW4udjuLp9GzY1OMW0Pb3AehhjurrBtpMLwC6AORlkKjEA2bUYBvBzcYPN+PjtKwOIDaLRAYoByF4AuQCXJmRDCLoAm604DUB3AclhQK4Br69fYxDV1EKNRrLCgBQXvPv4iQE90aEkJGzpAKYJRIMAzACcXiA2ELEaABIkBoACDwbAXoBlDGI0w9TAMxNIgFCGgjkX5kKYC0DZGQBReJAxJHOTqwAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg6Ly04z+IfnXhJoOYgTqYBgFkNlgADfTG5TMygjQL8/EzXD90CpsanGKadmZgPYzFiyaCbScXgF0AczLIVGIAsmsxDODj4gGb8enbFwYQG0SjAxQDkL0AcgEuTciGEHQBNltxGoDuApLDgFwD3tx+yCCiKo8ajWSFASkuePvpIwN6okNJSNjSAUwTiAYBmAE4vUBsIGI1ACRIDAAFHgyAvQDLGMRohqmBZyaQAKEMBXMuzIUwF4CyMwBvl5MXVeEacQAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg+D8l5T+I3vf0G4OTNBeYBgFkNlgADTi3L2NkBGsWFmfYd+k+NjU4xZz0FMF6GPdWRoFtJxeAXQB3sp4iUeYguxbTAH5hiCEf3zIwgNggGg2gGIDsBZC/cGlCNoOwC7DYitMADBcQEQr4vUCkARdefmUwEOdGjUaywoAkL7x9yYCe6FASEtgF6ACqiQFEgwA01eL2AiVhADKVGAAKPBgAewGWMYjRDFMDz0wgAUIZCuZfmAthLgBlZwBvBonjT09XegAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBg2Fvy6T+IvvnlGIM6jxWYBgFkNlgADWTN8GBkBGnmE+FiOP1gDzY1OMVMFVzAehinZewA204uALsA5mSQqcQAZNdiGMAtwAw24+uHvwwgNohGBygGIHsB5AJcmpANIegCbLbiNADdBSSHAbkGPPh0hUGBTwc1GskKA1Jc8OnNNwb0RIeSkLClA5gmEA0CMANweoHYQMRqAEiQGAAKPBgAewGWMYjRDFMDz0wgAUIZCuZcmAthLgBlZwBQ3ZP3OaGtaAAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4T2NkYGBgeJXf8h9EH/n4ksGGXxxMgwAyGyyABoIWTGZkBGnmExdj2HbrMjY1OMW81HTBehjXJeSCbScXgF0AczLIVGIAsmsxDGAXEQSb8fPNewYQG0SjAxQDkL0AcgEuTciGEHQBNltxGoDuApLDgFwDrnx8w6DDL4IajWSFASku+PTyFQN6okNJSNjSAUwTiAYBmAE4vUBsIGI1ACRIDAAFHgyAvQDLGMRohqmBZyaQAKEMBXMuzIUwF4CyMwBUFZC9raUyoQAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAw0lEQVQ4T2NkYGBg+Hln0n8QfeLSGwYLPREwDQLIbLAAGrAPamJkBGlm4+RjOHTyHjY1OMXszJXAehgPrqsD204uALsA5mSQqcQAZNdiGsDOAzHj5xcGBhAbRKMBFAOQvQB2AQ5NyGYQdgEWW3EagOECIgIBvxeINODK7bcMOqrCqNFIVhiQ4oVf3z8xoCc6lISELR3ANIFoEIAZgNsLlIQByFRiACjwYADsBVjGIEYzTA08M4EECGUomH9hLoS5AJSdASaukfnTt+kFAAAAAElFTkSuQmCC',
    ];
    const area = makeMatrix(12, 20);
    const player = {
      pos: {
        x: 0,
        y: 0,
      },
      matrix: null,
      score: 0,
    };
    const move = 1;
    let gameLoop;
    let gameRun = false;
    playerReset();
    draw();
    gameOver();
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 37) {
        playerMove(-move);
      } else if (e.keyCode === 39) {
        playerMove(+move);
      } else if (e.keyCode === 40) {
        console.log(player.pos);
        if (gameRun) {
          playerDrop();
        }
      } else if (e.keyCode === 38) {
        playerRotate(-move);
      }
    });
    document.getElementById('start_game').onclick = function () {
      gameRun = true;
      playerReset();
      console.log(player.pos);
      gameLoop = setInterval(function () {
        if (gameRun) {
          update();
        } else {
          gameOver();
        }
      }, 10);
      // this.disabled=true;
    };
  }, []);
  return (
    <div className={styles.canvasWrap}>
      <canvas ref={tetrisRef} id="tetris" width="240" height="400"></canvas>
      <button type="button" id="start_game">
        Start
      </button>
    </div>
  );
};
