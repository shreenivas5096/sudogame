var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SolverFun(board, 0, 0, 9);
};

function checkFun(board,i,j,num,n)
    {
        for(let a=0;a<n;a++)
        {
            if(board[a][j]==num || board[i][a]==num)
            {
                return false;
            }
        }
        
    let ii=i-i%3,jj=j-j%3;
        
        for(let x=0;x<3;x++)
            for(let y=0;y<3;y++)
            {
                if(board[ii+x][jj+y]==num)return false;
            }
        
        return true;
        
    }
    
function SolverFun(board,i,j,n)
    {
        if(j==n)
        {
            i++;
            j=0;
        }
        
        if(i==n)
        {
			FillBoard(board);
            return true;
        }
        
        //Already Filled
        if(board[i][j]>=1 && board[i][j]<=9)
        {
            return SolverFun(board,i,j+1,n);;
        }
        
        //Blank .
        for(let ii=1;ii<=9;ii++)
        {
            if(checkFun(board,i,j,ii,n))
            {
                board[i][j]=ii;
                if(SolverFun(board,i,j+1,n))return true;
                board[i][j]=0;
            }
        }
        
        return false;
    }