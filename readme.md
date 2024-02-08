# Olaf Explains

Welcome to the GitHub repository for [Olaf Explains](https://twitter.com/olafexplains), a unique and fully automated Twitter account that provides daily insights into historical events, narrated by none other than Olaf Scholz, the German Chancellor.

![Example image](https://d39ob9hwkmfin1.cloudfront.net/80141319-1ef5-4611-9b18-0614bd0110f8.png?Expires=4070908800&Key-Pair-Id=K1J9Z1M14GSH74&Signature=sC9aF3QdiEBadr2LBcTteIRAVI7Lk0euqrSjxQ1MbL83iez~q77LKVCXbJsDlD6LtWiCK4u41XT3ThF1ZDjE2JPJn28mcOLgVBZd6v3pVaxEh8eIHLaRtagbvehefIPSa~NHHuaTpRgBPpbMkr1IUQbJg48OYbKxkuS-lSUcfwMrNBMuMW~BAlFf7YVZhOCe8pqrktNZBmZvwu03ODlb~0dHak~rpqxALjSgvobbNznF3TaYQ59vjnk3ARkixHgoF--Z~LLoUH1MXjrXxw99gDkLdN6yurHf9ZBDzPmKRNvGMD7~eReTXPdZkiFgQ-YipFTnwcN4GMaUmW6KO7K2qA__)

## How it works

Each day, Olaf Explains provides a detailed Twitter thread about a significant historical event that happened on that date. The tweet begins with a brief explanation of the event, followed by a thread delving further into the details. Each tweet is accompanied by an AI-generated image that depicts the event, with the amusing twist of featuring Olaf Scholz's face on the main character.

The entire process, from generating the tweets to creating the images, is fully automated thanks to Teampilot AI. All powered by a single "launchpad".

Initially GPT generates the content of the tweet. However, since GPT isn't always accurate in counting characters, a custom function validates tweet length, ensuring each tweet adheres to Twitter's 280 character limit. If the test fails, GPT will rewrite and retest it until it passes.

After the tweet has been generated and validated, our AI creates a fitting image for the event using DALL-E 3. The AI then adds a final touch by swapping the main character's face in the image with a pre-uploaded image of Olaf Scholz.

## Why Teampilot

When conceptualizing Olaf Explains, a tool was needed that could handle multiple AI tasks effectively. Traditional methods would have required integrating multiple APIs, such as OpenAI for language model, OpenAI's DALL-E for image generation, and Replicate or HuggingFace for face-swapping AI. This would've meant a lot of code and signing up for multiple services.

Teampilot, however, offered a more holistic and streamlined solution. With Teampilot's single "launchpad", all these tasks were combined into one cohesive workflow. This made the development process not only more manageable but also more efficient.

## Want to Run Your Own Automated Twitter Bot?

Currently, the Teampilot launchpad used in this project cannot be directly copied. If you're interested in running your own automated Twitter bot or need help setting up a similar project, please don't hesitate to send me a [direct message on Twitter](https://twitter.com/paukraft).

## Contributing

As an open-source project, we encourage contributions. Feel free to fork the repository, make your changes, and submit a pull request. If you have any questions, feel free to [reach out](https://twitter.com/paukraft) on Twitter.

## License

This project is licensed under the terms of the MIT license. For more details, see the [LICENSE](LICENSE) file.
