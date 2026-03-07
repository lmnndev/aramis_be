import { and, desc, eq, getTableColumns, ilike, or, sql } from 'drizzle-orm';
import { departments, subjects } from '../db/schema';
import { db } from '../db';
import express from 'express';
import { antiSQLinJector } from '../utils/sqlRegex';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { search, department, page = 1, limit = 10} = req.query;


        //NaN handling: if non numeric values are sent via params
        //page or limit will produce a NaN

        //limits should be strictly capped
        const currentPage = Math.max(1, parseInt(String(page), 10)|| 1);
        const limitPerPage = Math.min(Math.max(1, parseInt(String(limit),10)||10),100);

        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        //If search query exists, filter by subject name OR subject code
        if(search){
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${search}%`),
                    ilike(subjects.code, `%${search}%`),
                )
            )
        }

        //departments filter exists
        //If search query exists, filter by subject name OR subject code
        if(department){
                    const deptPattern = `%${antiSQLinJector(String(department))}%`;
                    filterConditions.push(ilike(departments.name, deptPattern))       
        }

        //combine all filters  using AND if any exists
        const whereClause = filterConditions.length > 0 ? and(...filterConditions):undefined;
        const countResult = await db
        .select({count: sql<number>`count(*)`.mapWith(Number)})
        .from(subjects)
        .leftJoin(departments, eq(subjects.department_id, departments.id))
        .where(whereClause)

        const totalCount = countResult[0]?.count ?? 0;

        const subjectsList = await db.select({
            ...getTableColumns(subjects), 
            department: {...getTableColumns(departments)}
        })
        .from(subjects).leftJoin(departments, eq(subjects.department_id, departments.id))
        .where(whereClause)
        .orderBy(desc(subjects.createdAt))
        .limit(limitPerPage)
        .offset(offset)


        res.status(200).json({
            data: subjectsList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount/limitPerPage)
            }
        })
    }catch(err){
        console.log(`Get /subjects error: ${err}`);
        res.status(500).json({error: 'Failed to get subjects'})
    }
})

router.post('/', async (req,res)=>{
    const {department_id, code, name, description} = req.body;
    if(!department_id || !code || !name || !description){
        res.status(400).json({error: "Missing fields"})
    }

    const result= await db.insert(subjects).values({department_id, code,name,description}).returning();

    res.json(result); 
})

export default router;