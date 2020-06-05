import * as admin from 'firebase-admin';

export async function getResume(db: admin.database.Database): Promise<Resume> {
  return await db.ref('resume').once('value').then(snapshot => snapshot.val());
}

export async function getDatabaseRules(db: admin.database.Database) {
  return await db.getRulesJSON();
}

export interface Resume {
  phone: string;
  email: string;
  location: string;
}
