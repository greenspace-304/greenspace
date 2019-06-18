INSERT into Questions 
	VALUES (2001, 'What best describes your plant?', 'Category'); -- category
INSERT into Questions
	VALUES (2002, 'Does your plant have flowers?', 'HasFlowers'); -- hasFlowers (from hasFlowers table)
INSERT into Questions
	VALUES (2003, 'What color flowers?', 'FlowerColor'); -- flowerColor
INSERT into Questions
	VALUES (2004, 'How many petals (average)', 'PetalNumber'); -- petalNumber
INSERT into Questions 
	VALUES (2005, 'What color bark?', 'BarkColor');	-- barkColor
-- INSERT into Questions
--	VALUES (2006, 'Any leaves visible?', NULL); -- nothing added to query but answer will determine what next question is
INSERT into Questions
	VALUES (2007, 'How are your leaves arranged on the stem?', 'LeafArrangement'); -- leafArrangement
-- INSERT into Questions
--	VALUES (2008, 'Compound leaves?', 'LeafShape'); -- leafShape
INSERT into Questions
	VALUES (2009, 'Leaf shape?', 'LeafShape'); -- leafShape
INSERT into Questions
	VALUES (2010, 'Leaf color?', 'LeafColor');	-- leafColor
INSERT into Questions
	VALUES (2011, 'Any visible fruit or cones?', 'HasFruits'); -- hasFruits (from hasFruits table)
INSERT into Questions
	VALUES (2012, 'What type are they?', 'FruitType'); -- fruitType
INSERT into Questions
	VALUES (2013, 'What shape?', 'FruitShape');    -- fruitShape
INSERT into Questions
	VALUES (2014, 'What color?', 'FruitColor'); -- fruitColor

   -- comments indicate what will go in the WHERE clause for the query, depending on chosen answer
INSERT into Answers
	VALUES (2001, 7001, 'Ferns', 2007); -- WHERE Category = 'Ferns'
INSERT into Answers
	VALUES (2001, 7002, 'Shrubs', 2002); -- Category = 'Shrubs'
INSERT into Answers
	VALUES (2001, 7003, 'Trees', 2002); -- Category = 'Trees'
INSERT into Answers
	VALUES (2001, 7004, 'Herbs', 2002); -- Category = 'Herbs'
    
INSERT into Answers
	VALUES (2002, 7001, 'Yes', 2003);	-- HasFlowers = true
 INSERT into Answers
	VALUES (2002, 7002, 'Other/NA', 2005); -- do nothing (include plants with and without flowers) since can't be sure plant doesn't have flowers at all
    
INSERT into Answers
	VALUES (2003, 7001, 'Red', 2004); -- FlowerColor = 'red'
INSERT into Answers
	VALUES (2003, 7002, 'Pink', 2004); -- FlowerColor = 'pink'
INSERT into Answers
	VALUES (2003, 7003, 'Green', 2004); -- and so on
INSERT into Answers
	VALUES (2003, 7004, 'White', 2004);
INSERT into Answers
	VALUES (2003, 7005, 'Blue', 2004);
INSERT into Answers
	VALUES (2003, 7006, 'Orange', 2004);
INSERT into Answers
	VALUES (2003, 7007, 'Yellow', 2004);
INSERT into Answers
	VALUES (2003, 7008, 'Violet', 2004);
INSERT into Answers
	VALUES (2003, 7009, 'Brown', 2004);
INSERT into Answers
	VALUES (2003, 7010, 'Beige', 2004);
 
 Insert into Answers
	VALUES (2004, 7001, '2', 2005); -- PetalNumber = 2
 INSERT into Answers
	VALUES (2004, 7002, '3', 2005); -- PetalNumber = 3
INSERT into Answers
	VALUES (2004, 7003, '4', 2005); -- PetalNumber = 4
INSERT into Answers
	VALUES (2004, 7004, '5', 2005); -- PetalNumber = 5
INSERT into Answers
	VALUES (2004, 7005, '6', 2005); -- PetalNumber = 6
Insert into Answers
	VALUES (2004, 7006, '7', 2005); -- PetalNumber = 7
Insert into Answers
	VALUES (2004, 7007, '8', 2005); -- PetalNumber = 8
Insert into Answers
	VALUES (2004, 7008, 'Other/NA', 2005); -- do nothing (no filtering for petalNumber)
    
INSERT into Answers
	VALUES (2005, 7001, 'Brown', 2007); -- BarkColor = 'Brown'
INSERT into Answers
	VALUES (2005, 7002, 'Red', 2007); -- BarkColor = 'Red'
INSERT into Answers
	VALUES (2005, 7003, 'Grey', 2007); -- and so on
INSERT into Answers
	VALUES (2005, 7004, 'White', 2007);
INSERT into Answers
	VALUES (2005, 7005, 'Orange', 2007);
INSERT into Answers
	VALUES (2005, 7006, 'Green', 2007);
INSERT into Answers
	VALUES (2005, 7007, 'Black', 2007);
INSERT into Answers
	VALUES (2005, 7008, 'Yellow', 2007);
INSERT into Answers
	VALUES (2005, 7009, 'Other/NA', 2007); -- do nothing (no filtering for BarkColor)

    
-- INSERT into Answers
--	VALUES (2006, 7001, 'Yes', 2007); -- do nothing (no filtering for LeafColor)
-- INSERT into Answers
--	VALUES (2006, 7002, 'No', 2011); -- do nothing (no filtering for LeafColor)
    
INSERT into Answers
	VALUES (2007, 7001, 'Whorled', 2009); -- LeafArrangement = 'Whorled'
INSERT into Answers
	VALUES (2007, 7002, 'Alternate', 2009); -- LeafArrangement = 'Alternate'
INSERT into Answers
	VALUES (2007, 7003, 'Opposite', 2009); -- and so on
INSERT into Answers
	VALUES (2007, 7004, 'Spiral', 2009);
INSERT into Answers
	VALUES (2007, 7004, 'Other/NA', 2011); -- do nothing (no filtering for LeafArrangement)
    
-- INSERT into Answers
--	VALUES (2008, 7001, 'Yes', 2010); -- LeafShape = 'Compound'
-- INSERT into Answers
--	VALUES (2008, 7002, 'Other/NA', 2009); -- do nothing (filter will happen in next question)
    
INSERT into Answers
	VALUES (2009, 7001, 'Oval', 2010); -- LeafShape = 'Oval'
INSERT into Answers
	VALUES (2009, 7002, 'Needle', 2010); -- LeafShape = 'Needle'   
INSERT into Answers
	VALUES (2009, 7003, 'Scale', 2010); -- and so on
INSERT into Answers
	VALUES (2009, 7004, 'Compound', 2010);
INSERT into Answers
	VALUES (2009, 7005, 'Other/NA', 2010); -- do nothing (no filtering for LeafShape)
    
INSERT into Answers
	VALUES (2010, 7001, 'Green', 2011); -- LeafColor = 'Green'
INSERT into Answers
	VALUES (2010, 7002, 'Yellow', 2011); -- LeafColor = 'Yellow'
INSERT into Answers
	VALUES (2010, 7003, 'Purple', 2011);   -- and so on
INSERT into Answers
	VALUES (2010, 7004, 'Red', 2011);    
INSERT into Answers
	VALUES (2010, 7005, 'Other/NA', 2011);  -- do nothing (no filtering for LeafColor)just to be safe bc some leaves may change color
    
INSERT into Answers
	VALUES (2011, 7001, 'Yes', 2012); -- HasFruits = true
INSERT into Answers
	VALUES (2011, 7002, 'Other/NA', NULL); -- do nothing (no filtering for HasFruits)

INSERT into Answers
	VALUES (2012, 7001, 'Nuts', 2013); -- FruitType = 'Nuts'
INSERT into Answers
	VALUES (2012, 7002, 'Pomes', 2013);  -- FruitType = 'Pomes'  
INSERT into Answers
	VALUES (2012, 7003, 'Legumes', 2013);  -- and so on
INSERT into Answers
	VALUES (2012, 7004, 'Berries', 2013);    
INSERT into Answers
	VALUES (2012, 7005, 'Grain', 2013);    
INSERT into Answers
	VALUES (2012, 7006, 'Cones', NULL); -- FruitType = 'Cones'
INSERT into Answers
	VALUES (2012, 7007, 'Other/NA', 2013); -- do nothing (no filtering for FruitType)
    
INSERT into Answers
	VALUES (2013, 7001, 'Round', 2014); -- FruitType = 'Round'
INSERT into Answers
	VALUES (2013, 7002, 'Oval', 2014); -- FruitType = 'Oval'
INSERT into Answers
	VALUES (2013, 7003, 'Aggregate', 2014); -- FruitType = 'Aggregate'

INSERT into Answers
	VALUES (2014, 7001, 'Red', NULL); -- FruitColor = 'Red'
INSERT into Answers
	VALUES (2014, 7002, 'White', NULL); -- FruitColor = 'White'
INSERT into Answers
	VALUES (2014, 7003, 'Blue', NULL);   -- and so on
INSERT into Answers
	VALUES (2014, 7004, 'Orange', NULL);    
INSERT into Answers
	VALUES (2014, 7005, 'Other/NA', NULL); -- do nothing (no filtering for FruitColor)