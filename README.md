# About the delivery
The product consists of three parts:
- backend
- frontend
- solution.ipynb - Data exploring and data gathering/processing


## Prerequisits
You should have NodeJS installed and several python packages.

### Dataset
The dataset is located in a seperate repository that can be found here: https://github.com/sfi-norwai/2022_hackathon_hemsil2_dataset. The `README.md` file of this repository contains further information about the dataset and what the different data columns represent. It also clearly states that the dataset should only be used and distributed within the scope of this hackathon. Please read it carefully.

You can clone it to your local machine by running 
`git clone https://github.com/sfi-norwai/2022_hackathon_hemsil2_dataset.git`

Please don't commit the dataset into your working repository. We are not allowed to distribute the dataset in any way outside of the *NorwAI 2022 hackathon*. To make it possible for you to freely share your contribution to the hackathon afterwards (e.g. through opening your GutHub repo for reference), we need to ensure that the dataset itself is not contained in the contribution. 

It is best to keep the dataset in a completely seperate folder on your local machine. You can also keep it in the root of your local copy of the working repository, as long as you don't rename it. In this case, the `.gitignore` file protects you from commiting it by mistake. 

After you have forked your working repository, navigate to the folder where you store it on your local machin **into** the folder. 
Getting the dataset

## Running the backend
Go into the backend folder in a terminal and run 
```bash
npm install
node run index.js 
```

## Running the frontend
Go into the frontend folder in a terminal and run
```bash
npm install
npm start
```