import 'package:flutter/material.dart';

class HomeWalletScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      width: double.infinity,
      child: Stack(
        children: <Widget>[
          //Container for top data
          Container(
            margin: EdgeInsets.symmetric(horizontal: 32, vertical: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text("\$2589.90", style: TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.w700),),

                    Container(
                      child: Row(
                        children: <Widget>[
                          Icon(Icons.notifications, color: Colors.lightBlue[100],),
                          SizedBox(width: 16,),
                          CircleAvatar(
                            radius: 25,
                            backgroundColor: Colors.white,
                            child: ClipOval(
                              child: Image.asset("",fit: BoxFit.contain,),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),

                Text("Available Balance", style: TextStyle(fontWeight: FontWeight.w700,fontSize: 16, color: Colors.blue[100]),),

                SizedBox(height: 24,),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Container(
                        child: Column(
                          children: <Widget>[
                            Container(
                              decoration: const BoxDecoration(
                                color: Color.fromRGBO(243, 245, 248, 1),
                                borderRadius: BorderRadius.all(Radius.circular(18))
                              ),
                              child: Icon(Icons.date_range, color: Colors.blue[900], size: 30,),
                              padding: const EdgeInsets.all(12),
                            ),
                            const SizedBox(
                              height: 4,
                            ),
                            Text("Send", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.blue[100]),),
                          ],
                        ),
                    ),

                    Container(
                      child: Column(
                        children: <Widget>[
                          Container(
                            decoration: const BoxDecoration(
                                color: Color.fromRGBO(243, 245, 248, 1),
                                borderRadius: BorderRadius.all(Radius.circular(18))
                            ),
                            child: Icon(Icons.public, color: Colors.blue[900], size: 30,),
                            padding: const EdgeInsets.all(12),
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          Text("Request", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.blue[100]),),
                        ],
                      ),
                    ),

                    Container(
                      child: Column(
                        children: <Widget>[
                          Container(
                            decoration: const BoxDecoration(
                                color: Color.fromRGBO(243, 245, 248, 1),
                                borderRadius: BorderRadius.all(Radius.circular(18))
                            ),
                            child: Icon(Icons.attach_money, color: Colors.blue[900], size: 30,),
                            padding: const EdgeInsets.all(12),
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          Text("Loan", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.blue[100]),),
                        ],
                      ),
                    ),

                    Container(
                      child: Column(
                        children: <Widget>[
                          Container(
                            decoration: const BoxDecoration(
                                color: Color.fromRGBO(243, 245, 248, 1),
                                borderRadius: BorderRadius.all(Radius.circular(18))
                            ),
                            child: Icon(Icons.trending_down, color: Colors.blue[900], size: 30,),
                            padding: const EdgeInsets.all(12),
                          ),
                          const SizedBox(
                            height: 4,
                          ),
                          Text("Topup", style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.blue[100]),),
                        ],
                      ),
                    )

                  ],
                )
              ],
            ),
          ),

          //draggable sheet
          DraggableScrollableSheet(
            builder: (context, scrollController){
                return Container(
                  decoration: const BoxDecoration(
                    color: Color.fromRGBO(243, 245, 248, 1),
                    borderRadius: BorderRadius.only(topLeft: Radius.circular(40), topRight: Radius.circular(40))
                  ),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        const SizedBox(height: 24,),
                        Container(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Text("Recent Transactions", style: TextStyle(fontWeight: FontWeight.w900,fontSize: 24, color: Colors.black),),
                              Text("See all", style: TextStyle(fontWeight: FontWeight.w700,fontSize: 16, color: Colors.grey[800]),)
                            ],
                          ),
                          padding: EdgeInsets.symmetric(horizontal: 32),
                        ),
                        const SizedBox(height: 24,),

                        //Container for button
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 32),
                          child: Row(
                            children: <Widget>[
                              Container(
                                child: Text("All", style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.grey[900]),),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.all(Radius.circular(20)),
                                  boxShadow: [BoxShadow(color: Color.fromRGBO(243, 245, 248, 1), blurRadius: 10.0, spreadRadius: 4.5)]
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                              ),
                              const SizedBox(width: 14,),
                              Container(
                                child: Row(
                                  children: <Widget>[
                                    CircleAvatar(
                                      radius: 8,
                                      backgroundColor: Colors.green,
                                    ),
                                    SizedBox(
                                      width: 8,
                                    ),
                                    Text("Income", style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.grey[900]),),
                                  ],
                                ),
                                decoration: const BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.all(Radius.circular(20)),
                                    boxShadow: [BoxShadow(color: Color.fromRGBO(243, 245, 248, 1), blurRadius: 10.0, spreadRadius: 4.5)]
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                              ),
                              const SizedBox(width: 16,),
                              Container(
                                child: Row(
                                  children: <Widget>[
                                    CircleAvatar(
                                      radius: 8,
                                      backgroundColor: Colors.orange,
                                    ),
                                    SizedBox(
                                      width: 8,
                                    ),
                                    Text("Expenses", style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.grey[900]),),
                                  ],
                                ),
                                decoration: const BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.all(Radius.circular(20)),
                                    boxShadow: [BoxShadow(color: Color.fromRGBO(243, 245, 248, 1), blurRadius: 10.0, spreadRadius: 4.5)]
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 16,),
                        //Container list view for expenses and incomes
                        Container(
                          child: Text("TODAY", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                          padding: const EdgeInsets.symmetric(horizontal: 32),
                        ),

                        const SizedBox(height: 16,),

                        ListView.builder(
                          itemBuilder: (context, index){
                            return Container(
                              margin: const EdgeInsets.symmetric(horizontal: 32),
                              padding: const EdgeInsets.all(16),
                              decoration: const BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.all(Radius.circular(20))
                              ),
                              child: Row(
                                children: <Widget>[
                                  Container(
                                    decoration: BoxDecoration(
                                        color: Colors.grey[100],
                                        borderRadius: const BorderRadius.all(Radius.circular(18))
                                    ),
                                    child: Icon(Icons.date_range, color: Colors.lightBlue[900],),
                                    padding: const EdgeInsets.all(12),
                                  ),

                                  const SizedBox(width: 16,),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: <Widget>[
                                        Text("Payment", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.grey[900]),),
                                        Text("Payment from My Rental", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                                      ],
                                    ),
                                  ),

                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: <Widget>[
                                      Text("+\$500.5", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.lightGreen[900]),),
                                      Text("26 Jan", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                                    ],
                                  )
                                ],
                              ),
                            );
                          },
                          shrinkWrap: true,
                          itemCount: 2,
                          padding: EdgeInsets.all(0),
                          controller: ScrollController(keepScrollOffset: false),
                        ),

                        //now expense
                        const SizedBox(height: 16,),

                        Container(
                          child: Text("YESTERDAY", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                          padding: const EdgeInsets.symmetric(horizontal: 32),
                        ),

                        const SizedBox(height: 16,),

                        ListView.builder(
                          itemBuilder: (context, index){
                            return Container(
                              margin: const EdgeInsets.symmetric(horizontal: 32),
                              padding: const EdgeInsets.all(16),
                              decoration: const BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.all(Radius.circular(20))
                              ),
                              child: Row(
                                children: <Widget>[
                                  Container(
                                    decoration: BoxDecoration(
                                        color: Colors.grey[100],
                                        borderRadius: const BorderRadius.all(Radius.circular(18))
                                    ),
                                    child: Icon(Icons.directions_car, color: Colors.lightBlue[900],),
                                    padding: const EdgeInsets.all(12),
                                  ),

                                  const SizedBox(width: 16,),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: <Widget>[
                                        Text("Petrol", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.grey[900]),),
                                        Text("Payment from My Rental", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                                      ],
                                    ),
                                  ),

                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: <Widget>[
                                      Text("-\$500.5", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.orange[900]),),
                                      Text("26 Jan", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.grey[500]),),
                                    ],
                                  )
                                ],
                              ),
                            );
                          },
                          shrinkWrap: true,
                          itemCount: 2,
                          padding: EdgeInsets.all(0),
                          controller: ScrollController(keepScrollOffset: false),
                        ),

                        //now expense

                      ],
                    ),
                    controller: scrollController,
                  ),
                );
            },
            initialChildSize: 0.65,
            minChildSize: 0.65,
            maxChildSize: 1,
          )
        ],
      ),
    );
  }
}
