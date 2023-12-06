# livable--r3f-next13
![1701847278405](https://github.com/LuLue7775/livable-site-temp/assets/37790017/d2722b4e-a090-4646-96c9-7b7fca3c1f56)
[`live demo`](https://livable-site.vercel.app/)
[`official domain`](https://thelivablestudio.com/)



## Introduction (in RADIO manner) 
Note: RADIO, a system design framework

### Requirements Exploration: 
Functional requirements: 
* Appointment system, shopping system, and payment functionality
* Email receipt automation: System should automatically send a receipt to the user after a purchase.
* Login authentication and messenger feature *(crucial)* *(still ongoing)*



Non-functional requirements: 
* Performance optimization
* Search Engine Optimization (SEO) and Google Analytics (GA) enhancements *(still ongoing)*
* Periodic renovation of a 3D canvas on the landing page to introduce new upcoming events, aligning with the SEO plan to improve interaction and engagement among viewers. However, performance considerations remain crucial.


### Architecture/High-level Design: 
![ig8p2_螢幕擷取畫面 2023-11-03 192537](https://github.com/LuLue7775/livable-site-temp/assets/37790017/5cbec6ef-f325-4aeb-a640-b853c0d5d9f1)


### Data Model: 
On client side
- Data to be persisted: 
    - Products or events being added to cart. We persist that on localstorage.
    - Caches data (products, events) on localstorage after initial pull from firebase. Due to the need of validating stock, will need to pull a fresh data(of that specific product) from firebase.
- Ephemeral data:
    - Minor things like filters or position of objects on 3D canvas.


### Interface Definition (API):

| page     | HTTP Method	 | API Path |
| -------- | -------- | -------- |
| /events   | GET     | /events     |
| /events   | GET     | /event-availabilities     |
| /shop   | GET     | /products     |
| /bio   | GET     | /bio     |
| /policies   | GET     | /policies     |
| /checkout   | POST     | /orders   |
| in CMS   | POST     | /appointment   |

### Optimizations and Deep Dive: 
* We will be focusing on UX, performance and SEO since this is a ecommerce website after all.
* Performance optimization report will be updated here below.
