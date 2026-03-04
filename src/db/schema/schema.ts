import { relations } from 'drizzle-orm';
import { pgTable,  varchar, timestamp, integer } from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date()).notNull()
}

export const departments = pgTable('departments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  code: varchar ('code',{length:50}).notNull().unique(),
  name: varchar ('name',{length:255}).notNull(),
  description: varchar ('description',{length:255}),
  ...timestamps
});
//When trying to delete a department, if any subject depends on it, don’t allow deletion (restrict).
export const subjects = pgTable('subjects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  department_id: integer('department_id').notNull().references(() => departments.id,{onDelete: 'restrict'}),
  name: varchar ('name',{length:255}).notNull(),
  code: varchar ('code',{length:50}).notNull().unique(),
  description: varchar ('description',{length:255}),
  ...timestamps
});


//Relations
//technically a type checker for schema
//Without this line, if you fetch a department, you just get the dept info
//With this line you can easily ask for the database to include all subjects of a dept in one go
export const departmentRelations = relations(departments, ({many})=>({subjects: many(subjects) }))

//Subject Relations
export const subjectRelations = relations(subjects, ({one})=>({
  department: one(departments, {
  fields: [subjects.department_id],
  references: [departments.id]
  }) 
}))


//automatically create types for you
//based on your schema
//to avoid manual typing of types
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;

//Subject
export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;