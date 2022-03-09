# The World's Best Intro to TDD, Level 1: TDD Done Right
https://online-training.jbrains.ca/courses/8788/lectures/139065

## Series-4-Client-First-Design-with-Mock-Objects

The original code is Java, but this repo, I've used Typescript for the implementation 

## 01---Redo-from-Start

"Clusters of behavior push us towards complicated tests with a lot of duplication. If we can isolate the parts from each other,
then we can avoid the combinatoric explosion in the number of tests that we need to write.

Here we start re-implementing the "sell one item" feature using Client-First Design and Mock Objects.

You'll see over the coming series that mock objects don't have to lead to hyperactive, brittle tests that restrict refactoring.

On the contrary, we will use mocks to give us timely and uncompromising feedback about the health (or not) of the dependencies among modules."

## 02---The-Client-Gets-Their-Way

Implementing the happy path case for our Controller led us to design parts of its collaborators in the Model and View. 

In this episode, we complete our implementation of the Controller without having to implement its collaborators. 

Instead, we create abstractions of our collaborators, ruthlessly avoiding any unnecessary dependencies on them. 

This results in clear, self-documenting code, even before we commit to any implementation of the layer (or layers) below. 
